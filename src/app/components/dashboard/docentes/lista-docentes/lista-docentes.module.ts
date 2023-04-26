import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDocentesComponent } from './lista-docentes.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormAbmDocentesModule } from './form-abm-docentes/form-abm-docentes.module';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaDocentesComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormAbmDocentesModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    ListaDocentesComponent,
  ]
})
export class ListaDocentesModule { }
