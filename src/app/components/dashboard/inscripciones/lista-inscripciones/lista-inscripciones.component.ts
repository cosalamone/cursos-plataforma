import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { State } from '../store/inscripciones.reducer';
import { selectInscripcionesState } from '../store/inscripciones.selectors';
import { Alumno, Curso, Inscripcion } from 'src/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormAbmInscripcionesComponent } from './form-abm-inscripciones/form-abm-inscripciones.component';

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
  alumnos: Alumno[] = [];


  displayedColumns: string[] = [
    'idInscripcion',
    'idCurso',
    'idAlumno',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>


  state$: Observable<State>

  constructor(private store: Store,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alumnosService: AlumnosService) {

    this.state$ = this.store.select(selectInscripcionesState)

    this.inscripcionesService.getInscripciones()
    .subscribe((objeInscripciones) => {
      this.inscripciones = objeInscripciones;

      this.dataSource = new MatTableDataSource(this.inscripciones as any)
      // this.cursosService
      //   .getCursos()
      //   .subscribe(
      //     (dataCursos) => {
      //       // this.cursosInscriptos = dataCursos.filter(curso => this.inscripciones?.some(insc => insc.idCurso === curso.id))

      //       this.dataSource = new MatTableDataSource(dataCursos as any)

      //     }
      //   );
    })
  }


  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());

  }

  abrirFormABMInscripcion(): void{
    const dialog = this.matDialog.open(FormAbmInscripcionesComponent)
    dialog.afterClosed().subscribe((valor)=>{
      if(valor){
        let inscripcion: Inscripcion = valor;
        let newId =  Math.max(...this.dataSource.data.map(x => x.id)) + 1;

        inscripcion.id = newId;

        this.dataSource.data = [...this.dataSource.data, inscripcion];
      }
    })
  }


  detalleAlumnosInscriptos(){}

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }))
  } // se usa en el html de la futura tabla de inscripciones - 

}
