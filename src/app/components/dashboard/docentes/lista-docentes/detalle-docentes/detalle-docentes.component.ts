import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { Curso, Inscripcion } from 'src/interfaces';
import { Docente } from 'src/interfaces/docente';

@Component({
  selector: 'app-detalle-docentes',
  templateUrl: './detalle-docentes.component.html',
  styleUrls: ['./detalle-docentes.component.scss']
})
export class DetalleDocentesComponent {
  panelOpenState = false;
  inscripciones: Inscripcion[] | undefined;
  cursosInscriptos: Curso[] | undefined;
  tieneCursosACargo!: boolean;
  docente: Docente | undefined;

  displayedColumns: string[] = [
    'idCurso',
    'name',
  ];

  dataSource!: MatTableDataSource<any, any>


  constructor(private activatesRoute: ActivatedRoute,
    private docentesService: DocentesService,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,


  ) {

    // para ver el detalle del docente
    this.docentesService.getDocentesPorId(parseInt(this.activatesRoute.snapshot.params['idDocente']))
      .subscribe((docente) => this.docente = docente)

    // para ver el detalle de los cursos que tiene a cargo el Docente --> con una tabla --> no tendrá la opcion de eliminarse
    this.inscripcionesService.getCursosDeIdDocente(parseInt(this.activatesRoute.snapshot.params['idDocente']))
      .subscribe((data) => {
        this.inscripciones = data
        this.cursosService
          .getCursos()
          .subscribe(
            (dataCursos) => {
              this.cursosInscriptos = dataCursos.filter(x => this.inscripciones?.some(insc => insc.idCurso === x.id))
              this.dataSource = new MatTableDataSource(this.cursosInscriptos as any)
              if (this.cursosInscriptos !== undefined && this.cursosInscriptos.length > 0) {
                this.tieneCursosACargo = true;
              } else {
                this.tieneCursosACargo = false;
              }

            }

          )
      })
  }

}
