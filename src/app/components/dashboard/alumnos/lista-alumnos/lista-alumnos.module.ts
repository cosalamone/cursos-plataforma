import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { TablaCursosPorIdAlumnoComponent } from './tabla-cursos-por-id-alumno/tabla-cursos-por-id-alumno.component';





@NgModule({
  declarations: [
    ListaAlumnosComponent,
    DetalleAlumnoComponent,
    TablaCursosPorIdAlumnoComponent,
  ],
  imports: [
    CommonModule,
  

  ],
  exports: [
    ListaAlumnosComponent
  ],
})
export class ListaAlumnosModule { }
