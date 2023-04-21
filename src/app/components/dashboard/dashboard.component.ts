import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/interfaces';
import { Observable, Subject, Subscription } from 'rxjs';
import links from './nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  links = links;

  showFiller = false;

  authUserObs$: Observable<Usuario>

  suscripcionAuthUser: Subscription | null = null;

  destrodyed$ = new Subject<void>();

  constructor(private authService: AuthService,
    private router: Router
  ) {
    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();
  }

  // para evitar usar espacio de la Mem RAM guardamos el auth en una variable



  logOut(): void {
    this.router.navigate(['auth', 'login'])
  }

}
