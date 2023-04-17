import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCursosComponent } from './tabla-cursos.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    TablaCursosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule

  ],
  exports: [
    TablaCursosComponent
  ]
})
export class TablaCursosModule { }
