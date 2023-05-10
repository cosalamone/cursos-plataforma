import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, pipe } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/interfaces';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent  {

  authUserObs$: Observable<Usuario | null>;

  displayedColumns: string[] = [
    'id',
    'nombreApellido',
    'rol',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  destroyed$ = new Subject<void>();

  constructor(private usuariosService: UsuariosService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,

  ) {

    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();

    this.usuariosService
      .getUsuarios()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any)
        )
      )
  }



  abrirFormABMUsuarios(){}

  editarUsuario(){}

  eliminarUsuario(){}

  detalleUsuario(){}
}
