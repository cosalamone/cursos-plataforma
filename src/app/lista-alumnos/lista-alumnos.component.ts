import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface Alumnos {
  posicion: number;
  nombre: string;
  apellido: string;
  dni: number;
}

const ALUMNOS_DATA: Alumnos[] = [
  { posicion: 1, nombre: 'Armando', apellido: 'Perez', dni: 1123234},
  { posicion: 2, nombre: 'Marina', apellido: 'Cerezo', dni: 123644 },
  { posicion: 3, nombre: 'Maria', apellido: 'Ayala', dni: 12765634 },
  { posicion: 4, nombre: 'Carlos', apellido: 'String', dni: 12890834 },
  { posicion: 5, nombre: 'Brian', apellido: 'Otero', dni: 85235783 },
  { posicion: 6, nombre: 'Oscar', apellido: 'Basile', dni: 16786234},
  { posicion: 7, nombre: 'Nelida', apellido: 'Paredes', dni: 74542416},
  { posicion: 8, nombre: 'Omar', apellido: 'Martinez', dni: 85421356},
  { posicion: 9, nombre: 'Florencia', apellido: 'Rodriguez', dni: 97423421},
  { posicion: 10, nombre: 'Luciano', apellido: 'Vidal', dni: 7563453 },
];

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})

export class ListaAlumnosComponent {

  displayedColumns: string[] = ['posicion', 'nombre', 'apellido', 'dni'];
  dataSource = new MatTableDataSource(ALUMNOS_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


