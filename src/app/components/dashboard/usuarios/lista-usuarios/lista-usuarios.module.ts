import { NgModule } from '@angular/core';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosRoutingModule } from '../usuarios-routing.module';
import { UsuariosComponent } from '../usuarios/usuarios.component';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    UsuariosComponent
  ],
  imports: [
    SharedModule,
    UsuariosRoutingModule
  ],
  exports: [
    ListaUsuariosComponent
  ]
})
export class ListaUsuariosModule { }
