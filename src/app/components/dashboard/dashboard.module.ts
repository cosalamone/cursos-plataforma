import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FormAbmAlumnosModule } from './alumnos/lista-alumnos/form-abm-alumnos/form-abm-alumnos.module';
import { LogInModule } from 'src/app/components/dashboard/auth/log-in/log-in.module';
import { ListaAlumnosModule } from './alumnos/lista-alumnos/lista-alumnos.module';
import { TablaCursosModule } from './cursos/tabla-cursos/tabla-cursos.module';
import { AuthComponent } from './auth/auth.component';
import { ListaDocentesModule } from './docentes/lista-docentes/lista-docentes.module';





@NgModule({
  declarations: [
    DashboardComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ListaAlumnosModule,
    FormAbmAlumnosModule,
    TablaCursosModule,
    LogInModule,
    ListaDocentesModule,
    ListaDocentesModule


  ],
  exports: [
    DashboardComponent,
    AuthComponent
  ]
})
export class DashboardModule { }
