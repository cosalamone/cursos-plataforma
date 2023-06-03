import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocentesService } from 'src/app/services/docentes.service';
import { Curso, Docente } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-cursos',
  templateUrl: './form-abm-cursos.component.html',
  styleUrls: ['./form-abm-cursos.component.scss']
})

export class FormAbmCursosComponent {

  minLength: number = 3;
  minDuracion: number = 1;
  maxDuracion: number = 12
  listaDocentes: Docente[] = [];

  cursoControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
  duracionControl = new FormControl('', [Validators.required, Validators.min(this.minDuracion), Validators.max(this.maxDuracion)])
  docenteControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
  cursosControl = new FormControl('', [Validators.required]);

  selectedValue: string | undefined;
  // cursos = ['Javascript','Angular','Vue'];

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private docentesService: DocentesService,
    private dialogRef: MatDialogRef<FormAbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { curso: Curso }) {

    this.registerForm = this.formBuilder.group({
      nombre: this.cursoControl,
      duracion: this.duracionControl,
      docente: this.docenteControl,
    })

   this.obtenerDocentes()
      
 

    if (data) {
      this.registerForm.patchValue(data['curso']);
    }
  }

  guardar(): void {
    if (this.registerForm.valid) {
      this.dialogRef.close({ ...this.registerForm.value, id: this.data?.curso?.id ?? null })
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  obtenerDocentes(){
    this.docentesService.getDocentes()
    .subscribe((docentes)=>{
      this.listaDocentes = docentes
    })
  }
}
