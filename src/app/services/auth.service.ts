import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';
import { Usuario } from 'src/interfaces';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from '../store/auth/auth.actions';
import { selectAuthUser } from '../store/auth/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authUser$ = new BehaviorSubject<Usuario | null>(null);  Reemplazado por Store

  constructor(private router: Router,
    private http: HttpClient,
    private store: Store<AppState>) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {

    return this.store.select(selectAuthUser);

  }

  establecerUsuarioAutenticado(usuario: Usuario, token: string): void {
    this.store.dispatch(EstablecerUsuarioAutenticado({ usuarios: {...usuario, token} }))
  }

  logIn(usuarioLogueado: Usuario): void {
    this.http.get<Usuario[]>(`${enviroment.baseURL}/usuarios?email=${usuarioLogueado.email}&password=${usuarioLogueado.password}`)
      .subscribe({
        next: (usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
            this.router.navigate([''])

          }
        }
      }
      )
  }


  logOut(): void {
    localStorage.removeItem('token');
    this.store.dispatch(QuitarUsuarioAutenticado());
    this.router.navigate(['login']);

  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');

    return this.http.get<Usuario[]>(`${enviroment.baseURL}/usuarios?token=${token}`)
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            localStorage.setItem('perfil', usuarioAutenticado.role)
            this.establecerUsuarioAutenticado(usuarioAutenticado, usuarioAutenticado.token);
          }
          return !!usuarioAutenticado; // lo transforma en un boolean
        })
      )

  }
}


