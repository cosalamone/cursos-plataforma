import { NgModule } from '@angular/core';
import { ListaDocentesComponent } from './lista-docentes.component';

import { DetalleDocentesComponent } from './detalle-docentes/detalle-docentes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocentesComponent } from '../docentes/docentes.component';
import { DocentesRoutingModuleModule } from '../docentes-routing.module.module';
import { FormAbmDocentesComponent } from './form-abm-docentes/form-abm-docentes.component';



@NgModule({
  declarations: [
    ListaDocentesComponent,
    DetalleDocentesComponent,
    FormAbmDocentesComponent,
    DocentesComponent
  ],
  imports: [
   SharedModule,
   DocentesRoutingModuleModule

  ],
  exports: [
    ListaDocentesComponent,
  ]
})
export class ListaDocentesModule { }
