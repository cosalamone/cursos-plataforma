import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { Alumno, Curso, Inscripcion } from 'src/interfaces';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss']
})

export class DetalleAlumnoComponent {
  panelOpenState = false;
  inscripciones: Inscripcion[] | undefined;
  alumno: Alumno | undefined;
  cursosInscriptos: Curso[] | undefined;

  displayedColumns: string[] = [
    'idCurso',
    'name',
    'opciones'
  ];

  estaInscriptoEnCursos!: boolean;
  dataSource!: MatTableDataSource<any, any>


  constructor(private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
  ) {

    // para ver el detalle del alumno
    this.alumnosService.getAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['idAlumno']))
      .subscribe((alumno) => this.alumno = alumno)


    // para ver el detalle de los cursos en los que está inscripto este alumno --> con una tabla, donde pueda eliminarse la inscripcion del curso 
    this.inscripcionesService.getInscripcionesPorDeIdAlumno(parseInt(this.activatedRoute.snapshot.params['idAlumno']))
      .subscribe((data) => {
        this.inscripciones = data;
        this.cursosService
          .getCursos()
          .subscribe(
            (dataCursos) => {
              this.cursosInscriptos = dataCursos.filter(x => this.inscripciones?.some(insc => insc.idCurso === x.id))

              this.dataSource = new MatTableDataSource(this.cursosInscriptos as any)
              if (this.cursosInscriptos !== undefined && this.cursosInscriptos?.length > 0) {
                this.estaInscriptoEnCursos = true;
              } else {
                this.estaInscriptoEnCursos = false;
              }
            }
          );


      })





  }


  eliminarCursoDeAlumno(idCurso: number): void {
    let idCursoAEliminar = idCurso;
    let InscripcionAEliminar = this.inscripciones?.find(
      (inscripcion) => inscripcion.idCurso === idCursoAEliminar
    )

    let posicionAEliminar = this.dataSource.data.findIndex(
      (cursoInscripto) => cursoInscripto.id === idCursoAEliminar
    );

    this.dataSource.data?.splice(posicionAEliminar, 1)

    let idInscripcionAEliminar = InscripcionAEliminar?.id

    this.inscripcionesService.eliminarInscripcionPorId(idInscripcionAEliminar)
      .subscribe()

    this.dataSource.data = [...this.dataSource.data];

  }

}
