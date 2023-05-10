import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';
import { Usuario } from 'src/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authUser$ = new ReplaySubject<Usuario>();
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router,
    private http: HttpClient) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {

    return this.authUser$.asObservable();

  }

  logIn(usuarioLogueado: Usuario): void {
    this.http.get<Usuario[]>(`${enviroment.baseURL}/usuarios?email=${usuarioLogueado.email}&password=${usuarioLogueado.password}`)
      .subscribe(
        {
          next: (usuarios) => {
            const usuarioAutenticado = usuarios[0];
            if (usuarioAutenticado) {
              localStorage.setItem('token', usuarioAutenticado.token)
              this.authUser$.next(usuarioAutenticado);
              this.router.navigate([''])

            }
          }
        }
      )
  }


  logOut(): void {
    localStorage.removeItem('token')
    this.authUser$.next(null);
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
            this.authUser$.next(usuarioAutenticado);
          }
          return !!usuarioAutenticado; // lo transforma en un boolean
        })
      )

  }
}


