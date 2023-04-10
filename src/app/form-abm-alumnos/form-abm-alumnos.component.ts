import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Ciudad {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-form-abm-alumnos',
  templateUrl: './form-abm-alumnos.component.html',
  styleUrls: ['./form-abm-alumnos.component.scss']
})
export class FormAbmAlumnosComponent {



  ciudades: Ciudad[] = [
    {value: '1 CABA', viewValue:'Ciudad de Buenos Aires'},
    {value: '2 CBA', viewValue: 'Cordoba'},
    {value: '3 SFE', viewValue: 'Santa Fe'} ,
    {value: '4 SMA', viewValue: 'San Martin de los Andes'}
  ];

  nombreApellidoMinLength: number = 3;

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(this.nombreApellidoMinLength)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(this.nombreApellidoMinLength)]);
  emailControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],);
  telefonoControl = new FormControl('');
  ciudadControl = new FormControl('');



  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {


    this.registerForm = this.formBuilder.group({

      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      email: this.emailControl,
      telefono: this.telefonoControl,
      ciudad: this.ciudadControl,

    })

    console.log(this.emailControl.value)
  }


  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Debe registrar un correo';
    }

    return this.emailControl.hasError('pattern') ? 'El correo ingresado no es valido' : '';
  }

  onSubmit(): void {
   if (this.registerForm.valid) {
    console.log(this.registerForm.value)

   } else {
    alert('El formulario está incompleto')
   }
  }
}
