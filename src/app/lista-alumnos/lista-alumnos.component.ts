import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormAbmAlumnosComponent } from '../form-abm-alumnos/form-abm-alumnos.component';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from 'src/interfaces';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})

export class ListaAlumnosComponent {

  displayedColumns: string[] = [
    'posicion',
    'nombreCompleto',
    'dni',
    'telefono',
    'email',
    'opciones',
  ];
  dataSource!: MatTableDataSource<any, any>;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private alumnosService: AlumnosService) {

    // FX PARA OBTENER ARRAY DE ALUMNOS DE ALUMNOS.JSON (A FUTURO UNA API) - Utiliza AlumnosService
    this.alumnosService
      .getAlumnos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }


  abrirFormABMAlumnos(): void {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent)

    // Creando un nuevo array en el dataSource
    dialog.afterClosed().subscribe(valor => {
      if (valor) {

        this.dataSource.data = [...this.dataSource.data, valor];
      }
    })

  }


  editarAlumno(alumno: Alumno) {
    const dialog = this.matDialog.open(FormAbmAlumnosComponent, {
      data: {
        alumno,
      }
    });


    // find alumno and replace - guardar todo en datasource para que se implima en tabla
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let alumno: Alumno = valor
        console.log('array original' + this.dataSource)
        let idAlumnoAModificar = alumno.id

        let posicionAEditar = this.dataSource.data.findIndex(alumno => alumno.id === idAlumnoAModificar)

        let nuevoArray=this.dataSource.data[posicionAEditar]= alumno;

        console.log ('nuevo array' + nuevoArray )

      }
    });

  }




  eliminarAlumno(alumno: Alumno): void {
    let idAlumnoAEliminar = alumno.id;
    let posicionAEliminar = this.dataSource.data.findIndex(alumno => alumno.id === idAlumnoAEliminar)
    this.dataSource.data.splice(posicionAEliminar, 1);
    this.dataSource.data = [...this.dataSource.data]
    console.log(posicionAEliminar)

  }

}
