import { Component, OnDestroy, OnInit } from '@angular/core';
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

export class DashboardComponent {

  links = links;

  showFiller = false;

  authUser!: Usuario | null;
  
  authUserObs$: Observable<Usuario | null>;

  authUserSubs!: Subscription;

  constructor(private authService: AuthService,
    private router: Router
  ) {
    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();
  }

  logOut(): void {
    this.authService.logOut();
  }

}
