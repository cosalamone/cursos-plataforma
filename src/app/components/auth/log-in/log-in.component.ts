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
  
  minLength: number = 3;

  emailControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(this.minLength)]);

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
      this.authService.logIn({
        ...(this.authForm.value as Usuario) 
      })
    }

    setTimeout(() => {
      this.router.navigateByUrl(this.returnUrl)
    }, 100)
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Debe ingresar un correo';
    }

    return this.emailControl.hasError('pattern') ? 'Correo invalido' : '';
  }

}
