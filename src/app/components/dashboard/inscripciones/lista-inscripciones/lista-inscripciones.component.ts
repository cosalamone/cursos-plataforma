import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable, first, firstValueFrom } from 'rxjs';
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
  alumnos: Alumno[] | undefined;
  cursos: Curso[] | undefined;


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
    
    this.state$.subscribe(
      async (newState) => {
        if(!newState.error){
          
          this.inscripciones = newState.inscripciones;
          
          this.dataSource = new MatTableDataSource(this.inscripciones as any) // tengo que modificar e imprimir el nbre del curso y del alumno
          this.alumnos = await firstValueFrom(this.alumnosService.getAlumnos())
          this.cursos = await firstValueFrom(this.cursosService.getCursos())

        }
      });
  }
  
  obtenerNombreCursoPorId(id:number):  String | undefined {
    let curso = this.cursos?.find(x => x.id === id)
    return `${curso?.nombre}`;

  }

  obtenerNombreApellidoAlumnoPorId(id: number): String | undefined {
    let alumno = this.alumnos?.find(x => x.id === id)
    return `${alumno?.nombre} ${alumno?.apellido}`;

  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());

  }

  abrirFormABMInscripcion(): void {
    const dialog = this.matDialog.open(FormAbmInscripcionesComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let inscripcion: Inscripcion = valor;
        let newId = Math.max(...this.dataSource.data.map(x => x.id)) + 1;

        inscripcion.id = newId;

        this.dataSource.data = [...this.dataSource.data, inscripcion];
      }
    })
  }


  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
  } 

}
