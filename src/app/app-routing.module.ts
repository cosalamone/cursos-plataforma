import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaAlumnosModule } from './components/dashboard/alumnos/lista-alumnos/lista-alumnos.module';


const routes: Routes = [

  {
    path: 'alumnos',
    loadChildren: () => import('./components/dashboard/alumnos/lista-alumnos/lista-alumnos.module').then((m)=>m.ListaAlumnosModule)
    
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
