import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno, } from 'src/interfaces';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss']
})

export class DetalleAlumnoComponent  {
  panelOpenState = false;

  alumno: Alumno | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
  ) {
    console.log(this.activatedRoute.snapshot.params) //llega en forma de string

    this.alumnosService.getAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['idAlumno']))
      .subscribe((alumno) => this.alumno = alumno)
  }


  getCursosPorAlumno() {
  }



}
