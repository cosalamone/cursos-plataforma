import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from 'src/app/services/cursos.service';
import { Curso } from 'src/interfaces';
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

  cursos: Curso[] | undefined;


  registerForm: FormGroup;



  constructor(public formBuilder: FormBuilder,
    private cursosService: CursosService,
    private dialogRef: MatDialogRef<FormAbmDocentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { docente: Docente }) {

    this.registerForm = this.formBuilder.group({
      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      curso: this.cursosControl,
    })

    if (data) {
      this.registerForm.patchValue(data['docente'])
    }

    this.obtenerCursos()
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

  obtenerCursos(){
    this.cursosService.getCursos()
    .subscribe((cursos)=> {
      this.cursos = cursos 
      })
  }

}
