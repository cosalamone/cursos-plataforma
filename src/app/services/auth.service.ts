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

  logIn(usuarioLogueado: Usuario): void {

    const usuario1 = {
      id: 1,
      nombreApellido: 'Marcela Rodriguez',
      email: usuarioLogueado.email,
      contraseña: 'soymarcela',
    }
    localStorage.setItem('authUser', JSON.stringify(usuario1))
    this.authUser$.next(usuario1);
    this.router.navigate([''])

  }


  logOut():void {
    localStorage.removeItem('authUser')
    this.authUser$.next(null);
    this.router.navigate(['login']);

  }
}


