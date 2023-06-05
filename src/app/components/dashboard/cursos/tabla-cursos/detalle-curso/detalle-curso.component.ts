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

  displayedColumns: string[] = [
    'idAlumno',
    'name',
    'opciones'
  ];

  tieneAlumnosInscriptos!: boolean;
  dataSource!: MatTableDataSource<any, any>

  constructor(private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,) {


    this.cursosService.getCursoPorId(parseInt(this.activatedRoute.snapshot.params['idCurso']))
      .subscribe((curso) => this.curso = curso);


    this.inscripcionesService.getAlumnosDeIdCurso(parseInt(this.activatedRoute.snapshot.params['idCurso']))
      .subscribe((objeCurso) => {

        this.inscripciones = objeCurso;
 
        this.alumnosService
          .getAlumnos()
          .subscribe(
            (dataAlumnos) => {
        
              this.alumnosInscriptos = dataAlumnos.filter(x => this.inscripciones?.some(insc => insc.idAlumno === x.id))
       

              this.dataSource = new MatTableDataSource(this.alumnosInscriptos as any)


              if (this.alumnosInscriptos !== undefined && this.alumnosInscriptos.length > 0) {
                this.tieneAlumnosInscriptos = true;
              } else {
                this.tieneAlumnosInscriptos = false;
              }

            }
          );
      })


  }


  eliminarAlumnoDeCurso(idAlumno: number): void {
    let idAlumnoAEliminar = idAlumno;
    let InscripcionAEliminar = this.inscripciones?.find(
      (inscripcion) => inscripcion.idAlumno === idAlumnoAEliminar
    )


    let posicionAEliminar = this.dataSource.data.findIndex(
      (alumnoInscripto) => alumnoInscripto.id === idAlumnoAEliminar
    );

    this.dataSource.data?.splice(posicionAEliminar, 1);

    let idInscripcionAEliminar = InscripcionAEliminar?.id

    this.inscripcionesService.eliminarInscripcionPorId(idInscripcionAEliminar)
      .subscribe()

    this.dataSource.data = [...this.dataSource.data];

  }
}

