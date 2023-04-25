import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-inscripciones',
  templateUrl: './form-abm-inscripciones.component.html',
  styleUrls: ['./form-abm-inscripciones.component.scss']
})

export class FormAbmInscripcionesComponent {

  minLength: number = 3;
  minDuracion: number = 1;
  maxDuracion: number = 12

  cursoControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
  alumnoControl = new FormControl('', [Validators.required])
  dniControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inscripcion: Inscripcion }) {

    this.registerForm = this.formBuilder.group({

      curso: this.cursoControl,
      alumno:this.alumnoControl,
      dniControl: this.dniControl
    })
    if (data) {
      this.registerForm.patchValue(data['inscripcion']);
    }
  }

  guardar(): void {
    if (this.registerForm.valid) {
      this.dialogRef.close({ ...this.registerForm.value })
    } else {
      this.registerForm.markAllAsTouched();
    }

  }

  cerrarDialog(){
    this.dialogRef.close();
  }
}
