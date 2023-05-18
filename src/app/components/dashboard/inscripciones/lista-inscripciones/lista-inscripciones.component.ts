import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { State } from '../store/inscripciones.reducer';
import { selectInscripcionesState } from '../store/inscripciones.selectors';
import { Alumno, Curso, Inscripcion } from 'src/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {
  panelOpenState = false;
  inscripciones: Inscripcion[] | undefined;
  alumno: Alumno | undefined;
  cursosInscriptos: Curso[] | undefined;

  displayedColumns: string[] = [
    'idCurso',
    'name',
    'cantAlumnos',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>


  state$: Observable<State>

  constructor(private store: Store,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,) {

    this.state$ = this.store.select(selectInscripcionesState)

    this.inscripcionesService.getInscripciones()
    .subscribe((objeInscripciones) => {
      this.inscripciones = objeInscripciones;
      console.log(this.inscripciones)
      this.cursosService
        .getCursos()
        .subscribe(
          (dataCursos) => {
            console.log(dataCursos)
            this.cursosInscriptos = dataCursos.filter(x => this.inscripciones?.some(insc => insc.idCurso === x.id))
            console.log(this.cursosInscriptos)

            this.dataSource = new MatTableDataSource(this.cursosInscriptos as any)

          }
        );
    })
  }


  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
  }


  detalleAlumnosInscriptos(){}

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }))
  } // se usa en el html de la futura tabla de inscripciones - 

}
