import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/interfaces';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  returnUrl!: string;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }
  
  emailControl = new FormControl('', [Validators.required]);// agregar validaciones
  passwordControl = new FormControl('', [Validators.required]);// agregar validaciones

  authForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  })

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
    } else {
      console.log(this.authForm.value);
      this.authService.logIn({
        ...(this.authForm.value as Usuario) //revisar datos de usuario vs los enviado en el form
      })
    }

    setTimeout(() => {
      this.router.navigateByUrl(this.returnUrl)
    }, 100)
  }

}
