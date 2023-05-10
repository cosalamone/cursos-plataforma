import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/interfaces';

@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.scss']
})
export class DetalleUsuariosComponent {
  panelOpenState = false;

  usuario: Usuario | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService) {
    console.log(this.activatedRoute.snapshot.params)

    this.usuariosService.getUsuarioPorId(parseInt(this.activatedRoute.snapshot.params['idUsuario']))
      .subscribe((usuario) => this.usuario = usuario)
  }

}
