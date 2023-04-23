import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCursosComponent } from './tabla-cursos.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    TablaCursosComponent,
    DetalleCursoComponent
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
    MatMenuModule

  ],
  exports: [
    TablaCursosComponent
  ]
})
export class TablaCursosModule { }
