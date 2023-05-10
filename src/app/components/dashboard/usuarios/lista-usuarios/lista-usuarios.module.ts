import { NgModule } from '@angular/core';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosRoutingModule } from '../usuarios-routing.module';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { FormAbmUsuariosComponent } from './form-abm-usuarios/form-abm-usuarios.component';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    UsuariosComponent,
    FormAbmUsuariosComponent
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
