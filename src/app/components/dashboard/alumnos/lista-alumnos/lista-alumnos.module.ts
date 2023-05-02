import { NgModule } from '@angular/core';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { TablaCursosPorIdAlumnoComponent } from './tabla-cursos-por-id-alumno/tabla-cursos-por-id-alumno.component';
import { FormAbmAlumnosComponent } from './form-abm-alumnos/form-abm-alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosRoutingModule } from '../alumnos-routing.module';
import { AlumnosComponent } from '../alumnos/alumnos.component';





@NgModule({
  declarations: [
    ListaAlumnosComponent,
    DetalleAlumnoComponent,
    TablaCursosPorIdAlumnoComponent,
    FormAbmAlumnosComponent,
    AlumnosComponent
  ],
  imports: [
    SharedModule,
    AlumnosRoutingModule,
    
  ],
  exports: [
    ListaAlumnosComponent
  ]
})
export class ListaAlumnosModule { }
