import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocentesComponent } from './docentes/docentes.component';
import { DetalleDocentesComponent } from './lista-docentes/detalle-docentes/detalle-docentes.component';
import { ListaDocentesComponent } from './lista-docentes/lista-docentes.component';


const routes:  Routes = [
  {
    path: '',
    component: DocentesComponent,
    children: [
      {
        path: ':idDocente',
        component: DetalleDocentesComponent
      },
      {
        path: '',
        component: ListaDocentesComponent
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DocentesRoutingModuleModule { }
