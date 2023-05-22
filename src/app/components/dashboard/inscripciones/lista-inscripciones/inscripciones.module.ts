import { NgModule } from '@angular/core';
import { InscripcionesComponent } from '../inscripciones/inscripciones.component';
import { InscripcionesRoutingModule } from '../inscripciones-routing.module';
import { ListaInscripcionesComponent } from './lista-inscripciones.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from '../store/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeature } from '../store/inscripciones.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormAbmInscripcionesComponent } from './form-abm-inscripciones/form-abm-inscripciones.component';



@NgModule({
  declarations: [    
    ListaInscripcionesComponent,
    InscripcionesComponent,
    FormAbmInscripcionesComponent
  ],
  imports: [
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects])
  ], 
  exports: [
    ListaInscripcionesComponent
  ]
})
export class InscripcionesModule { }
