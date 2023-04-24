import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListaAlumnosComponent } from './components/dashboard/alumnos/lista-alumnos/lista-alumnos.component';
import { TablaCursosComponent } from './components/dashboard/cursos/tabla-cursos/tabla-cursos.component';
import { AuthComponent } from './components/dashboard/auth/auth.component';
import { LogInComponent } from './components/dashboard/auth/log-in/log-in.component';
import { ListaDocentesComponent } from './components/dashboard/docentes/lista-docentes/lista-docentes.component';
import { DetalleAlumnoComponent } from './components/dashboard/alumnos/lista-alumnos/detalle-alumno/detalle-alumno.component';
import { DetalleCursoComponent } from './components/dashboard/cursos/tabla-cursos/detalle-curso/detalle-curso.component';
import { DetalleInscipcionesComponent } from './components/dashboard/inscripciones/detalle-inscripciones/detalle-inscripciones.component';
import { TablaInscripcionesComponent } from './components/dashboard/inscripciones/tabla-inscripciones.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent, // que componente se muestra
    children: [
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: ListaAlumnosComponent,
          },
          {
            path: ':idAlumno',
            component: DetalleAlumnoComponent,
          },
        ]
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: TablaCursosComponent,
          },
          {
            path: ':idCurso',
            component: DetalleCursoComponent,
          }
        ]
      },
      {
        path: 'inscipciones',
        children: [
          {
            path: '',
            component: TablaInscripcionesComponent,
          },
          {
            path: ':idAlumno',
            component: DetalleInscipcionesComponent,
          },
        ]
      },
      {
        path: 'docentes',
        component: ListaDocentesComponent,
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
