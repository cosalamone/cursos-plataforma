import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DetalleUsuariosComponent } from './lista-usuarios/detalle-usuarios/detalle-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: ':idUsuario',
        component: DetalleUsuariosComponent
      },
      {
        path: '',
        component: ListaUsuariosComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
