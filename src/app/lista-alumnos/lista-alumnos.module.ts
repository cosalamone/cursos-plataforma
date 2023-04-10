import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './lista-alumnos.component';



@NgModule({
  declarations: [
    ListaAlumnosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListaAlumnosComponent
  ]
})
export class ListaAlumnosModule { }
