import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/interfaces';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  constructor(private authService: AuthService,
    private router: Router) {

  }
  emailControl = new FormControl('', [Validators.required]);// agregar validaciones
  contraseniaControl = new FormControl('', [Validators.required]);// agregar validaciones

  authForm = new FormGroup({
    email: this.emailControl,
    contrasenia: this.contraseniaControl,
  })

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
    } else {
      console.log(this.authForm.value);
      this.authService.logIn({
        ...(this.authForm.value as Usuario) //revisar datos de usuario vs los enviado en el form
      })
    }

    this.router.navigate(['home', 'alumnos'])
  }

}
