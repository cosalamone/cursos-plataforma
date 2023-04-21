import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
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
  emailControl = new FormControl();
  contraseniaControl = new FormControl();

  authForm = new FormGroup({
    email: this.emailControl, // agregar validaciones
    contrasenia: this.contraseniaControl, // agregar validaciones
  })

  logIn() {
    console.log(this.authForm.value);
    this.authService.logIn({
      ...(this.authForm.value as any), //revisar datos de usuario vs los enviado en el form
      id: 12,
    })
    this.router.navigate(['home', 'alumnos'])
  }

}
