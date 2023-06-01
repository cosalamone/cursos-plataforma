import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAbmAlumnosComponent } from './form-abm-alumnos/form-abm-alumnos.component';
import { AlumnosService } from '../../../../services/alumnos.service';
import { Alumno, Curso, Docente, Inscripcion, Usuario } from 'src/interfaces';
import { Observable, map } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { DocentesService } from 'src/app/services/docentes.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})

export class ListaAlumnosComponent {

  authUserObs$: Observable<Usuario | null>;

  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'dni',
    'opciones',
  ];

  dataSource!: MatTableDataSource<any, any>;



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  formatTelefono(telefono: number | string) {

    // Convert number to string

    const numberString = telefono.toString();

    // Split string into three parts

    const part1 = numberString.slice(0, 3);
    const part2 = numberString.slice(3, 6);
    const part3 = numberString.slice(6);

    // Return formatted string

    return `(${part1}) ${part2}-${part3}`;

  }

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private inscripcionesService: InscripcionesService,
    private docentesService: DocentesService
  ) {

    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();

    // FX PARA OBTENER ARRAY DE ALUMNOS DE BD MEDIANTE API - Utiliza AlumnosService
    this.alumnosService
      .getAlumnos()
      .pipe(
        map((alumnos: Array<any>) => alumnos.map(alumno => ({

          id: alumno.id,
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          dni: alumno.dni,
          telefono: this.formatTelefono(alumno.telefono),
          email: alumno.email

        })))
      )
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }



  abrirFormABMAlumnos(): void {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent);

    // Creando un nuevo array en el dataSource
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {


        let cursosPorInscribirse: Curso[] = valor.cursos; 

        valor.cursos = undefined; // borro datos de los cursos registrandolos como undefined asi no se guardan en BD

        let alumno: Alumno = valor  
        let newId = Math.max(...this.dataSource.data.map(x => x.id)) + 1;
        
        alumno.id = newId;
        this.dataSource.data = [...this.dataSource.data, alumno];


        this.alumnosService.postNewAlumno(alumno)
        .subscribe((alumno) => {
            if (alumno){
              this.inscripcionesService.getInscripciones().subscribe((datos) => { 
                if (datos) {
                  let inscripciones = datos

                  let maxIdInscripcion: number = Math.max(...inscripciones.map(x => x.id));
                  
                
                  for (let unCurso of cursosPorInscribirse) {



                    let objetoInscripcion: Inscripcion = {
                      id: ++maxIdInscripcion,
                      idCurso: unCurso.id,
                      idDocente: unCurso.docente, 
                      idAlumno: alumno.id
                    }
                    console.log(objetoInscripcion)
                    this.inscripcionesService.postNewInscripcion(objetoInscripcion).subscribe() 

                  }

                }
              })
            }

          })


      }
    });
  }


  editarAlumno(alumno: Alumno) {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent, {
      data: {
        alumno,
      },
    });

    // find alumno and replace - guardar todo en datasource para que se imprima nueva tabla
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let alumno: Alumno = valor;


        let idAlumnoAModificar = alumno.id;

        let posicionAEditar = this.dataSource.data.findIndex(
          (alumno) => alumno.id === idAlumnoAModificar
        );

        this.dataSource.data[posicionAEditar] = alumno;

        this.alumnosService.putAlumno(alumno, idAlumnoAModificar)
          .subscribe()

        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    });
  }

  eliminarAlumno(alumno: Alumno): void {
    let idAlumnoAEliminar = alumno.id;
    let posicionAEliminar = this.dataSource.data.findIndex(
      (alumno) => alumno.id === idAlumnoAEliminar
    );
    this.dataSource.data.splice(posicionAEliminar, 1);

    this.alumnosService.deleteAlumno(idAlumnoAEliminar)
      .subscribe()

    this.dataSource.data = [...this.dataSource.data];
  }

  detalleAlumno(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute
    }
    );
  }



}
