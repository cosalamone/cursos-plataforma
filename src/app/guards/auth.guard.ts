import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private location: Location) {

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.verificarToken()
      .pipe(
        map((usuarioAutenticado) => {

          if (!usuarioAutenticado) {

            Swal.fire(
              'Usuario inexistente o contraseña incorrecta',
              'Verifique los datos ingresados',
              'error'
            )
            
            return this.router.createUrlTree(['login'], { queryParams: { returnUrl: this.location.path() } })
          } else {
            return true
          }
        })
      )

  }

}
