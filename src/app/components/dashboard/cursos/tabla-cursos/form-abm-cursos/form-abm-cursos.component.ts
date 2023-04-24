import { Component , Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-cursos',
  templateUrl: './form-abm-cursos.component.html',
  styleUrls: ['./form-abm-cursos.component.scss']
})
export class FormAbmCursosComponent {

  minLength: number= 3;

  cursoControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
  duracionControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.minLength)])
  docenteControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {curso: Curso}){

      this.registerForm= this.formBuilder.group({
        nombre: this.cursoControl,
        duracion: this.duracionControl,
        docente: this.docenteControl,
      })
      if (data){
        this.registerForm.patchValue(data['curso']);
      }
  }

  guardar(): void{
    if(this.registerForm.valid){
      this.dialogRef.close({...this.registerForm.value, id: this.data?.curso?.id ?? null})
    } else{
      this.registerForm.markAllAsTouched();
    }
  }

  cerrarDialog(){
    this.dialogRef.close();
  }
}
