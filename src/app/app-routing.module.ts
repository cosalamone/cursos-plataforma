import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaAlumnosComponent } from './components/dashboard/lista-alumnos/lista-alumnos.component';
import { TablaCursosComponent } from './components/dashboard/tabla-cursos/tabla-cursos.component';
import { AuthComponent } from './components/dashboard/auth/auth.component';
import { LogInComponent } from './components/dashboard/auth/log-in/log-in.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent, // que componente se muestra
    children: [
      {
        path: 'alumnos',
        component: ListaAlumnosComponent,
        // children: [
        //   {
        //     path: '',
        //     component: ListaAlumnosComponent,
        //   },
        //   {
        //     path: 'id',
        //     component: componentehijo, --> el detalle de los alumnos
        //   },
        // ]
      },
      {
        path: 'cursos',
        component: TablaCursosComponent,
      },
      {
        path: 'login',
        component: LogInComponent,
      },

    ]
  },

  // {
  //   path: 'auth',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       component: LogInComponent,
  //     },

  //   ]
  // },

  {
    path: '**', // Cualquier otra ruta que no este definida
    redirectTo: 'home', // la redirige al dashboard = home
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
