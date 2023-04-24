import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleInscipcionesComponent } from './detalle-inscripciones/detalle-inscripciones.component';
import { TablaInscripcionesComponent } from './tabla-inscripciones.component';
import { FormAbmInscripcionesComponent } from './form-abm-inscripciones/form-abm-inscripciones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormAbmAlumnosModule } from '../alumnos/lista-alumnos/form-abm-alumnos/form-abm-alumnos.module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    DetalleInscipcionesComponent,
    TablaInscripcionesComponent,
    FormAbmInscripcionesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormAbmAlumnosModule,
    MatMenuModule,
    SharedModule,
    MatExpansionModule,
  ],
  exports: [
    TablaInscripcionesComponent
  ],
})
export class TablaInscripcionesModule { }
