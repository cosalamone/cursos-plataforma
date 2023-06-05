import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosModule } from './components/dashboard/alumnos/lista-alumnos/lista-alumnos.module';
import { TablaCursosModule } from './components/dashboard/cursos/tabla-cursos/tabla-cursos.module';
import { ListaDocentesModule } from './components/dashboard/docentes/lista-docentes/lista-docentes.module';
import { ListaUsuariosModule } from './components/dashboard/usuarios/lista-usuarios/lista-usuarios.module';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { InscripcionesComponent } from './components/dashboard/inscripciones/inscripciones/inscripciones.component';
import { InscripcionesModule } from './components/dashboard/inscripciones/lista-inscripciones/inscripciones.module';

const routes: Routes = [

  {
    path: 'alumnos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/alumnos/lista-alumnos/lista-alumnos.module').then((m)=>m.ListaAlumnosModule)
    
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/cursos/tabla-cursos/tabla-cursos.module').then((m)=>m.TablaCursosModule)
  },
  {
    path: 'docentes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/docentes/lista-docentes/lista-docentes.module').then((m)=>m.ListaDocentesModule)
  },
  {
    path:'inscripciones',
    canActivate: [AuthGuard],
    loadChildren: ()=> import('./components/dashboard/inscripciones/lista-inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)

  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/usuarios/lista-usuarios/lista-usuarios.module').then((m)=>m.ListaUsuariosModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LogInComponent
  },
  {
    path: '**',
    redirectTo: 'alumnos', 
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
