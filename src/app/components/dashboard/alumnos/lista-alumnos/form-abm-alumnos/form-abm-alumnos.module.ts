import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAbmAlumnosComponent } from './form-abm-alumnos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FormAbmAlumnosComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    FormAbmAlumnosComponent
  ]
})
export class FormAbmAlumnosModule { }
