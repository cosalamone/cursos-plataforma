import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos/cursos.component';
import { DetalleCursoComponent } from './tabla-cursos/detalle-curso/detalle-curso.component';
import { TablaCursosComponent } from './tabla-cursos/tabla-cursos.component';



const routes: Routes = [
  {
    path: '',
    component: CursosComponent, //Muestra Cursos - solo tiene <router-outlet>  que es quien renderiza los children
    children: [
      {
        path: ':idCurso',
        component: DetalleCursoComponent
      },
      {
        path: '',
        component: TablaCursosComponent
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
export class CursosRoutingModule { }
