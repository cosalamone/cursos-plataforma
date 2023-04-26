import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Docente } from 'src/interfaces/docente';

@Component({
  selector: 'app-form-abm-docentes',
  templateUrl: './form-abm-docentes.component.html',
  styleUrls: ['./form-abm-docentes.component.scss']
})
export class FormAbmDocentesComponent {


  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);
  cursosControl = new FormControl('', [Validators.required]);
  
  selectedValue: string | undefined;

  cursos = [
    { value: 'javascript01', viewValue: 'Javascript' },
    { value: 'angular02', viewValue: 'Angular' },
    { value: 'vue03', viewValue: 'Vue' },

  ]


  registerForm: FormGroup;



  constructor(public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAbmDocentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { docente: Docente }) {

    this.registerForm = this.formBuilder.group({
      nombre: this.nombreControl,
      apellido: this.apellidoControl,
    })

    if (data) {
      this.registerForm.patchValue(data['docente'])
    }
  }

  guardar(): void {
    if (this.registerForm.valid) {
      this.dialogRef.close({ ...this.registerForm.value, id: this.data?.docente?.id ?? null })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
