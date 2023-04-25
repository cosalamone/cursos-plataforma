import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAbmAlumnosComponent } from './form-abm-alumnos/form-abm-alumnos.component';
import { AlumnosService } from '../../../../services/alumnos.service';
import { Alumno } from 'src/interfaces';
import { map } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
import { TablaCursosPorIdAlumnoComponent } from './tabla-cursos-por-id-alumno/tabla-cursos-por-id-alumno.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})

export class ListaAlumnosComponent {


  displayedColumns: string[] = [
    'id',
    'nombreCompleto',
    'dni',
    'telefono',
    'email',
    'opciones',
  ];

  dataSource!: MatTableDataSource<any, any>;
  // router: any;

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
  ) {
    // FX PARA OBTENER ARRAY DE ALUMNOS DE ALUMNOS.JSON (A FUTURO UNA API) - Utiliza AlumnosService
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
        let alumno: Alumno = valor;
        let newId = Math.max(...this.dataSource.data.map(x => x.id)) + 1;

        alumno.id = newId;

        this.dataSource.data = [...this.dataSource.data, alumno];
      }
    });
  }


  editarAlumno(alumno: Alumno) {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent, {
      data: {
        alumno,
      },
    });

    // find alumno and replace - guardar todo en datasource para que se implima nueva tabla
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let alumno: Alumno = valor;

        console.log('array original' + this.dataSource.data);

        let idAlumnoAModificar = alumno.id;

        let posicionAEditar = this.dataSource.data.findIndex(
          (alumno) => alumno.id === idAlumnoAModificar
        );

        this.dataSource.data[posicionAEditar] = alumno;

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
    this.dataSource.data = [...this.dataSource.data];
    console.log(posicionAEliminar);
  }

  detalleAlumno(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute
    }
    );
  }



  nombreCurso: string | undefined;

  abrirDialogDetalleCursosPorAlumno(alumno: Alumno): void {
    console.log(this.dataSource.data) // array de alumnos
    // ver como obtengo el array de la tabla para ahi hacer el filter y poder renderizarlo
    //  this.inscripcionesService.getInscripcionDeCursosPorAlumno
    // podria pasarle por parametro el idAlumno, hacer el filter, y cargarlo
    // en mattable

    


    let alumnoBuscado = alumno
    let datosPorCargar: Alumno[] = this.dataSource.data.filter((alumno)=> alumno.id === alumnoBuscado.id)


    const dialog = this.matDialog.open(TablaCursosPorIdAlumnoComponent, {
      data: { datosPorCargar },
    })

  }


}
