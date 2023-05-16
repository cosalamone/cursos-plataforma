import { JsonPipe } from '@angular/common';
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

  dataSource!: MatTableDataSource<any, any>

  constructor(private activatesRoute: ActivatedRoute,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,) {

    console.log(this.activatesRoute.snapshot.params)

    // para ver el detalle del curso
    this.cursosService.getCursoPorId(parseInt(this.activatesRoute.snapshot.params['idCurso']))
      .subscribe((curso) => this.curso = curso);


    // para ver el detalle de los alumnos inscriptos en ese curso --> con una tabla, donde pueda eliminarse la inscripcion de un alumno 
    this.inscripcionesService.getAlumnosDeIdCurso(parseInt(this.activatesRoute.snapshot.params['idCurso']))
      .subscribe((objeCurso) => {

        this.inscripciones = objeCurso;
        console.log(this.inscripciones) // muestra 2 inscripciones en el idcurso2 OK
        this.alumnosService
          .getAlumnos()
          .subscribe(
            (dataAlumnos) => {
              console.log(dataAlumnos) // tengo 8 alumnos en el array, de los cuales sólo 2 están en el idCurso2 OK
              this.alumnosInscriptos = dataAlumnos.filter(x => this.inscripciones?.some(insc => insc.idAlumno === x.id))
              console.log(this.alumnosInscriptos) // dio [] con 2 almnos OK 

              this.dataSource = new MatTableDataSource(this.alumnosInscriptos as any) // carga tabla OK 

            }
          );
      })

  }


  eliminarAlumnoDeCurso(idAlumno: number): void {
    let idAlumnoAEliminar = idAlumno;
    let InscripcionAEliminar = this.inscripciones?.find(
      (inscripcion) => inscripcion.idAlumno === idAlumnoAEliminar
    )
    console.log('inscripcionAEliminar = ' + InscripcionAEliminar + 'deberia ser un obj con todos los datos de indcripcion')

    let posicionAEliminar = this.dataSource.data.findIndex( // tiene que buscar en el array de alumnosInscriptios la posicionAEliminar del idAlumno OK 
      (alumnoInscripto) => alumnoInscripto.id === idAlumnoAEliminar
    );
    console.log('posicionAEliminar = ' + posicionAEliminar + 'deberia ser un number que inndica la posicion que será tulizada en el splice para borrar')

    this.inscripciones?.splice(posicionAEliminar, 1); // falta asignar este nuevo array al DataSource pero me tira error por typescript

    let idInscripcionAEliminar = InscripcionAEliminar?.id
    
    this.inscripcionesService.deleteAlumnoDeCurso(idInscripcionAEliminar)
      .subscribe((idInscripcionAEliminar) => console.log(idInscripcionAEliminar))

    this.dataSource.data = [...this.dataSource.data]; // no se imprime la taba sin el elemento eliminado 

  }
}

