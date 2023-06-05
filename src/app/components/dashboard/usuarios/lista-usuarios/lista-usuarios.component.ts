import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, pipe } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/interfaces';
import { FormAbmUsuariosComponent } from './form-abm-usuarios/form-abm-usuarios.component';

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



  abrirFormABMUsuarios(){
    const dialog = this.matDialog.open(FormAbmUsuariosComponent);
    dialog.afterClosed().subscribe((valor)=>{
      if(valor){
        let usuario: Usuario = valor;
        let newId =Math.max(...this.dataSource.data.map(x => x.id)) + 1;
        usuario.id = newId;

        this.usuariosService.postUsuario(usuario)
        .subscribe()

        this.dataSource.data = [...this.dataSource.data, usuario];
      }
    })
  }

  editarUsuario(usuario: Usuario){
    const dialog= this.matDialog.open(FormAbmUsuariosComponent, {
      data: {
        usuario,
      }
    });

    dialog.afterClosed().subscribe((valor)=> {
      if (valor) {
        let usuario: Usuario = valor;

        let idUsuarioAModificar = usuario.id;
        let posicionAEditar = this.dataSource.data.findIndex(
          (usuario)=> usuario.id === idUsuarioAModificar
        );

        this.dataSource.data[posicionAEditar] = usuario;

        this.usuariosService.putUsuario(usuario, idUsuarioAModificar)
        .subscribe()

        this.dataSource = new MatTableDataSource(this.dataSource.data);
      }
    })
  }

  eliminarUsuario(usuario: Usuario): void{
    let idUsuarioAEliminar = usuario.id;
    let posicionAEliminar = this.dataSource.data.findIndex(
      (usuario)=> usuario.id === idUsuarioAEliminar
    );
    this.dataSource.data.splice(posicionAEliminar,1);

    this.usuariosService.deleteUsuario(idUsuarioAEliminar)
    .subscribe()

    this.dataSource.data = [...this.dataSource.data];
  }

  detalleUsuario(usuarioId: number): void{
    this.router.navigate([usuarioId], {
      relativeTo: this.activatedRoute
    })
  }
}
