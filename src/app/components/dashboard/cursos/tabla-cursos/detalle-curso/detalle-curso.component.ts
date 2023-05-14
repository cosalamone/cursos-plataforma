import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { Alumno, Curso, Inscripcion } from 'src/interfaces';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})

export class DetalleCursoComponent {

  panelOpenState = false;
  inscripciones: Inscripcion[] | undefined;
  curso: Curso | undefined;
  alumnosInscriptos: Alumno[] | undefined;


  constructor(private activatesRoute: ActivatedRoute,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,) {

    console.log(this.activatesRoute.snapshot.params)

    this.cursosService.getCursoPorId(parseInt(this.activatesRoute.snapshot.params['idCurso']))
      .subscribe((curso) => this.curso = curso);

    this.inscripcionesService.getAlumnosDeIdCurso(parseInt(this.activatesRoute.snapshot.params['idCurso']))
      .subscribe((objeCurso) => {
        
        this.inscripciones = objeCurso;
        this.alumnosService
        .getAlumnos()
        .subscribe(
          (dataAlumnos) => {
            console.log(dataAlumnos)
            this.alumnosInscriptos = dataAlumnos.filter(x => this.inscripciones?.some(insc=>insc.idAlumno === x.id))
          }
        );
  
        console.log(this.inscripciones)
        


      })





  }



  eliminarAlumnoDeCurso(){}
}

