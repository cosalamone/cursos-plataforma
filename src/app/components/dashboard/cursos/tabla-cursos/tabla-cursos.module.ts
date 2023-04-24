import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCursosComponent } from './tabla-cursos.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormAbmCursosModule } from './form-abm-cursos/form-abm-cursos.module';
import { MatMenuModule } from '@angular/material/menu';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    TablaCursosComponent,
    DetalleCursoComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule,
    FormAbmCursosModule

  ],
  exports: [
    TablaCursosComponent
  ]
})
export class TablaCursosModule { }
