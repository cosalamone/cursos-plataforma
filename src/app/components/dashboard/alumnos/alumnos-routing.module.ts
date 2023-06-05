import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { DetalleAlumnoComponent } from './lista-alumnos/detalle-alumno/detalle-alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';



const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent,
    children: [
        {
            path: ':idAlumno',
            component: DetalleAlumnoComponent
        },
        {
            path: '',
            component: ListaAlumnosComponent
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

export class AlumnosRoutingModule { }
