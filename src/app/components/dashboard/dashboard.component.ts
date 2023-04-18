import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/interfaces';
import { Subject, Subscription, takeUntil } from 'rxjs';
import links from './nav-items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  links = links;

  showFiller = false;

  authUser: Usuario | null = null;

  suscripcionAuthUser: Subscription | null = null;

  destrodyed$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authService.obtenerUsuarioAutenticado()
      .pipe(
        takeUntil(this.destrodyed$)
      )
      .subscribe((usuario) => this.authUser = usuario);

  }

  // para evitar usar espacio de la Mem RAM guardamos el auth en una variable

  ngOnDestroy(): void {
    this.suscripcionAuthUser?.unsubscribe();
  }
}
