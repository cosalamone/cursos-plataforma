import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-usuarios',
  templateUrl: './form-abm-usuarios.component.html',
  styleUrls: ['./form-abm-usuarios.component.scss']
})
export class FormAbmUsuariosComponent {



  nombreApellidoControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],);
  passwordControl = new FormControl('', [Validators.required]);;
  tokenControl = new FormControl('', Validators.required);
  roleControl = new FormControl('', Validators.required);

  selectedValue: string | undefined;
  rolesDisponibles = ['admin', 'user'];
  
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormAbmUsuariosComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario}) {

      this.registerForm = this.formBuilder.group({
        nombreApellido: this.nombreApellidoControl,
        email: this.emailControl,
        password: this.passwordControl,
        token: this.tokenControl,
        role: this.roleControl
      })

      if (data){
        this.selectedValue = data.usuario.role

        this.registerForm.patchValue(data['usuario'])
      }
    }

    guardar(): void {
      if(this.registerForm.valid){
        this.dialogRef.close({...this.registerForm.value, id: this.data?.usuario.id ?? null})
      } else {
        this.registerForm.markAllAsTouched();
      }
    }

    cerrarDialog(){
      this.dialogRef.close();
    }
}
