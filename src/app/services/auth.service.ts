import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Usuario } from 'src/interfaces';


// interface LoginFormValue {
//   email: string;
//   password: string;
// }
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authUser$ = new ReplaySubject<Usuario>();
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {

    return this.authUser$.asObservable();

  }

  logIn(usuario: Usuario): void {

    const usuario1 = {
      id: 1,
      nombreApellido: 'Marcela Rodriguez',
      email: 'marce@mail.com',
      contraseña: 'soymarcela',
    }
    localStorage.setItem('authUser', JSON.stringify(usuario))

    this.router.navigate(['dashboard'])

  }
  // this.authUser$.next(usuario); 

}


