import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-inscripciones',
  templateUrl: './form-abm-inscripciones.component.html',
  styleUrls: ['./form-abm-inscripciones.component.scss']
})
export class FormAbmInscripcionesComponent {

  registerForm: FormGroup;
  selectedValue: string | undefined;
  alumnos = this.alumnosService.getAlumnos().subscribe((alumnos)=> console.log(alumnos));

  nombreControl = new FormControl('', [Validators.required])
  cursosControl = new FormControl('', [Validators.required]);
  constructor(public formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
   @Inject(MAT_DIALOG_DATA) public data: {alumno: Alumno}){

    this.registerForm = this.formBuilder.group({
      nombreControl: this.nombreControl,
      cursosControl: this.cursosControl
    })
    
    if (data) {
      this.registerForm.patchValue(data['alumno']);
    }
  }

}
