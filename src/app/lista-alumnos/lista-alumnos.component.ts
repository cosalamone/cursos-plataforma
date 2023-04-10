import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface Alumnos {
  posicion: number;
  nombre: string;
  apellido: string;
  dni: number;
  telefono: number;
  ciudad: string;
}

const ALUMNOS_DATA: Alumnos[] = [
  { posicion: 1, nombre: 'Armando', apellido: 'Perez', dni: 1123234, telefono: 1556546, ciudad: 'capital federal' },
  { posicion: 2, nombre: 'Marina', apellido: 'Cerezo', dni: 123644, telefono: 156786, ciudad: 'san martin de los andes' },
  { posicion: 3, nombre: 'Maria', apellido: 'Ayala', dni: 12765634, telefono: 15678534, ciudad: 'capital federal' },
  { posicion: 4, nombre: 'Carlos', apellido: 'String', dni: 12890834, telefono: 157897, ciudad: 'capital federal' },
  { posicion: 5, nombre: 'Brian', apellido: 'Otero', dni: 85235783, telefono: 15789645, ciudad: 'capital federal' },
  { posicion: 6, nombre: 'Oscar', apellido: 'Basile', dni: 16786234, telefono: 157896453, ciudad: 'capital federal' },
  { posicion: 7, nombre: 'Nelida', apellido: 'Paredes', dni: 74542416, telefono: 15789456, ciudad: 'capital federal' },
  { posicion: 8, nombre: 'Omar', apellido: 'Martinez', dni: 85421356, telefono: 15778546, ciudad: 'capital federal' },
  { posicion: 9, nombre: 'Florencia', apellido: 'Rodriguez', dni: 97423421, telefono: 15556987, ciudad: 'capital federal'},
  { posicion: 10, nombre: 'Luciano', apellido: 'Vidal', dni: 7563453, telefono: 11577895, ciudad: 'capital federal' },
];

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})

export class ListaAlumnosComponent {

  displayedColumns: string[] = ['posicion', 'nombre', 'apellido', 'dni', 'telefono', 'ciudad'];
  dataSource = new MatTableDataSource(ALUMNOS_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


