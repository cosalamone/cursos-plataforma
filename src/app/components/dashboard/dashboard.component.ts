import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/interfaces';
import { Observable, Subject, Subscription } from 'rxjs';
import links from './nav-items';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  componentName: string = '';

  links = links;

  showFiller = false;

  authUser!: Usuario | null;

  authUserObs$: Observable<Usuario | null>;

  authUserSubs!: Subscription;

  seccionActual: string | null = null;


  constructor(private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();

    
  }

  saveSeccionActual(seccion:string) {
      this.seccionActual = seccion;
  
    
  }

  logOut(): void {
    this.authService.logOut();
    this.seccionActual = null;
  }

}
