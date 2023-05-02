import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { DetalleAlumnoComponent } from './lista-alumnos/detalle-alumno/detalle-alumno.component';
import { AlumnosComponent } from './alumnos/alumnos.component';



const routes: Routes = [
  {
    path: '',
    component: AlumnosComponent, //Muestra el componente Alumnos - solo tiene <router-outlet>  que es quien renderiza los children
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
    // tengo que mostrar  DetalleAlumno = es un comp distinto que no se renderiza sobre lista-alumnos
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
