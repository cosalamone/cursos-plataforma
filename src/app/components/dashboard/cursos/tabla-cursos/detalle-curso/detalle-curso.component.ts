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

  dataSource!: MatTableDataSource<any,any>
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
              this.alumnosInscriptos = dataAlumnos.filter(x => this.inscripciones?.some(insc => insc.idAlumno === x.id))

              this.dataSource= new MatTableDataSource(this.alumnosInscriptos as any) // faltaria poder ver o cargar el numero de inscripcion, para poder acceder y hacer el eliminar 

            }
          );

        console.log(this.inscripciones)

      })

  }


  eliminarAlumnoDeCurso(idAlumno: number): void {
    let idAlumnoAEliminar = idAlumno;
    let InscripcionAEliminar = this.inscripciones?.find(
      (inscripcion) => inscripcion.idAlumno === idAlumnoAEliminar
    )
    let posicionAEliminar = this.dataSource.data.findIndex(
      (inscripcion) => inscripcion.idAlumno === idAlumnoAEliminar
    );
    this.inscripciones?.splice(posicionAEliminar, 1);

    this.inscripcionesService.deleteAlumnoDeCurso(InscripcionAEliminar?.idInscripcion, InscripcionAEliminar)
    .subscribe((idInscripcionAEliminar)=> console.log(idInscripcionAEliminar))

      this.dataSource.data= [...this.dataSource.data];
    
  }
}

