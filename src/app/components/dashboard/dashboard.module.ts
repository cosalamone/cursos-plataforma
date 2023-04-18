import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { FormAbmAlumnosModule } from './form-abm-alumnos/form-abm-alumnos.module';
import { LogInModule } from 'src/app/components/dashboard/auth/log-in/log-in.module';
import { ListaAlumnosModule } from './lista-alumnos/lista-alumnos.module';
import { TablaCursosModule } from './tabla-cursos/tabla-cursos.module';





@NgModule({
  declarations: [
    DashboardComponent
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
    LogInModule


  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
