import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/interfaces/alumno';

@Component({
  selector: 'app-form-abm-alumnos',
  templateUrl: './form-abm-alumnos.component.html',
  styleUrls: ['./form-abm-alumnos.component.scss']
})
export class FormAbmAlumnosComponent {

  nombreApellidoMinLength: number = 3;
  dniMinLength: number = 7;
  telefonoMinLength: number = 8;

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(this.nombreApellidoMinLength)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(this.nombreApellidoMinLength)]);
  emailControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],);
  dniControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.dniMinLength)]);
  telefonoControl = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(this.telefonoMinLength)]);



  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alumno: Alumno }) {

    this.registerForm = this.formBuilder.group({

      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      email: this.emailControl,
      dni: this.dniControl,
      telefono: this.telefonoControl,

    })

    if (data) {
      this.registerForm.patchValue(data['alumno']);
    }

  }


  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Debe registrar un correo';
    }

    return this.emailControl.hasError('pattern') ? 'El correo ingresado no es valido' : '';
  }


  guardar(): void {
    if (this.registerForm.valid) {
      this.dialogRef.close({ ...this.registerForm.value, id: this.data?.alumno?.id ?? null })
    } else {
      this.registerForm.markAllAsTouched();
    }

  }

  cerrarDialog(){
    this.dialogRef.close();
  }
}
