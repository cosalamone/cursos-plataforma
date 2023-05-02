import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosModule } from './components/dashboard/alumnos/lista-alumnos/lista-alumnos.module';
import { TablaCursosModule } from './components/dashboard/cursos/tabla-cursos/tabla-cursos.module';

const routes: Routes = [

  {
    path: 'alumnos',
    loadChildren: () => import('./components/dashboard/alumnos/lista-alumnos/lista-alumnos.module').then((m)=>m.ListaAlumnosModule)
    
  },
  {
    path: 'cursos',
    loadChildren: () => import('./components/dashboard/cursos/tabla-cursos/tabla-cursos.module').then((m)=>m.TablaCursosModule)
  },
  {
    path: '**', // Cualquier otra ruta que no este definida
    redirectTo: 'alumnos', // la redirige al dashboard = home
  },
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
