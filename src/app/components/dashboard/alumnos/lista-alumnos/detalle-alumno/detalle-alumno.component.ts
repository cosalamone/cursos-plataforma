import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno } from 'src/interfaces';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss']
})

export class DetalleAlumnoComponent {
  panelOpenState = false;

  alumno: Alumno | undefined;

  constructor(private activatesRoute: ActivatedRoute,
    private alumnoService: AlumnosService) {
    console.log(this.activatesRoute.snapshot.params) //llega en forma de string

    this.alumnoService.getAlumnoPorId(parseInt(this.activatesRoute.snapshot.params['idAlumno']))
    .subscribe((alumno)=> this.alumno = alumno)
  }

}
