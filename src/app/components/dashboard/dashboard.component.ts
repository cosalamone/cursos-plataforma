import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/interfaces';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import links from './nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  links = links;

  showFiller = false;

  authUser: Usuario | null = null;

  authUserObs$: Observable<Usuario>

  suscripcionAuthUser: Subscription | null = null;

  destrodyed$ = new Subject<void>();

  constructor(private authService: AuthService,
    private router: Router
  ) {
    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();

    // this.authService.obtenerUsuarioAutenticado()
    //   .pipe(
    //     takeUntil(this.destrodyed$) //escucha hasta que se destruye
    //   )
    //   .subscribe((usuario) => this.authUser = usuario);

  }

  // para evitar usar espacio de la Mem RAM guardamos el auth en una variable

  ngOnDestroy(): void {
    // this.suscripcionAuthUser?.unsubscribe();
    this.destrodyed$.next();
    this.destrodyed$.complete()
  }

  logOut(): void {
    this.router.navigate(['auth', 'login'])
  }

}
