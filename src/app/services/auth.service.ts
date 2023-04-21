import { Injectable } from '@angular/core';
import { Observable, ReplaySubject  } from 'rxjs';
import { Usuario } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  authUser$ = new ReplaySubject<Usuario>();

  constructor() { }

  obtenerUsuarioAutenticado(): Observable<Usuario> {

    return this.authUser$.asObservable();

  }

  logIn(usuario: Usuario):void{

    this.authUser$.next(usuario);
  }

}
