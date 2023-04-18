import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaAlumnosComponent } from './components/dashboard/lista-alumnos/lista-alumnos.component';
import { TablaCursosComponent } from './components/dashboard/tabla-cursos/tabla-cursos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent, // que componente se muestra
    children: [
      {
        path: 'alumnos',
        component: ListaAlumnosComponent,
      },
      {
        path: 'cursos',
        component: TablaCursosComponent,
      },

    ]
  },
  {
    path: '**', // Cualquier otra ruta que no este definida
    redirectTo: 'dashboard', // la redirige al dashboard
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
