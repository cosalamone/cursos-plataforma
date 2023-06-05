import { Component, OnInit } from '@angular/core';
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
import { ListaInscripcionesComponent } from '../../inscripciones/lista-inscripciones/lista-inscripciones.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})

export class ListaAlumnosComponent implements OnInit {

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

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private inscripcionesService: InscripcionesService,
    private docentesService: DocentesService,
    private listaInscripciones: ListaInscripcionesComponent
  ) {

    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();

    this.alumnosService
      .getAlumnos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }

  ngOnInit(): void {

    this.activatedRoute.firstChild?.params.subscribe()
  }



  abrirFormABMAlumnos(): void {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent);

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
            if (alumno) {
              this.inscripcionesService.getInscripciones().subscribe((datos) => {
                if (datos) {
                  let inscripciones = datos

                  let maxIdInscripcion: number = Math.max(...inscripciones.map(x => x.id));

                  if (cursosPorInscribirse)
                    for (let unCurso of cursosPorInscribirse) {



                      let objetoInscripcion: Inscripcion = {
                        id: ++maxIdInscripcion,
                        idCurso: unCurso.id,
                        idDocente: unCurso.docente,
                        idAlumno: alumno.id
                      }
                     
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
      .subscribe();



    this.inscripcionesService.getInscripcionesPorDeIdAlumno(idAlumnoAEliminar)
      .subscribe((inscripcionesPorEliminar) => {

        for (let inscripcionPorEliminar of inscripcionesPorEliminar) {
          this.inscripcionesService.eliminarInscripcionPorId(inscripcionPorEliminar.id)
          this.listaInscripciones.eliminarInscripcionPorId(inscripcionPorEliminar.id)
        }

      });

    this.dataSource.data = [...this.dataSource.data];

  }

  detalleAlumno(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute
    }
    );
  }



}
