import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDocentesComponent } from './lista-docentes.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ListaDocentesComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    ListaDocentesComponent,
  ]
})
export class ListaDocentesModule { }
