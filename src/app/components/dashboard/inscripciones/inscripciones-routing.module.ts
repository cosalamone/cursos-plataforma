import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ListaInscripcionesComponent } from './lista-inscripciones/lista-inscripciones.component';

const routes: Routes = [
  {
    path:'',
    component: InscripcionesComponent,
    children: [
      {
        path: '',
        component: ListaInscripcionesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], 
  exports: [
    RouterModule
  ]
})
export class InscripcionesRoutingModule { }
