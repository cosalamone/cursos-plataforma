import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Alumno, Curso, Docente, Usuario } from 'src/interfaces';
import { FormAbmCursosComponent } from './form-abm-cursos/form-abm-cursos.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { DocentesService } from 'src/app/services/docentes.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { ListaInscripcionesComponent } from '../../inscripciones/lista-inscripciones/lista-inscripciones.component';


@Component({
  selector: 'app-tabla-cursos',
  templateUrl: './tabla-cursos.component.html',
  styleUrls: ['./tabla-cursos.component.scss']
})
export class TablaCursosComponent {

  authUserObs$: Observable<Usuario | null>;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'duracion',
    'docente',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>;
  docentes!: Docente[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private matDialog: MatDialog,
    private cursosService: CursosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private docentesService: DocentesService,
    private inscripcionesService: InscripcionesService,
    private listaInscripciones : ListaInscripcionesComponent


  ) {

    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();


    this.cursosService
      .getCursos()
      .subscribe(
        async (data) => {
          (this.dataSource = new MatTableDataSource(data as any))
          this.docentes = await firstValueFrom(this.docentesService.getDocentes())
        }
      );
  }

  obtenerNombreApellidoDocentePorId(id: number): String | undefined {

    let docente= this.docentes?.find(x => x.id === id);
    if (!docente) return "<Sin docente asignado>";
    return `${docente?.nombre} ${docente?.apellido}`;
  }


  abrirABMCurso(): void {
    const dialog = this.matDialog.open(FormAbmCursosComponent);

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {


        valor.docente.id
        let curso: Curso = valor;
        
        let newId = this.dataSource.data.length > 0? Math.max(...this.dataSource.data.map(x => x.id)) + 1 : 1;

        curso.id = newId;




        this.cursosService.postNewCurso(curso)
          .subscribe()
        this.dataSource.data = [...this.dataSource.data, curso];
      }
    })
  }

  editarCurso(curso: Alumno) {
    const dialog = this.matDialog.open(FormAbmCursosComponent, {
      data: {
        curso,
      }
    });

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let curso: Curso = valor;
        let idCursoModificar = curso.id;
        let posicionAEditar = this.dataSource.data.findIndex(
          (alumno) => alumno.id === idCursoModificar
        );
        this.dataSource.data[posicionAEditar] = curso;

        this.cursosService.putCurso(curso, idCursoModificar)
          .subscribe()
        this.dataSource = new MatTableDataSource(this.dataSource.data)
      }
    });
  }
  eliminarCurso(curso: Curso): void {
    let idCursoAEliminar = curso.id;
    let posicionAEliminar = this.dataSource.data.findIndex(
      (curso) => curso.id === idCursoAEliminar
    );
    this.dataSource.data.splice(posicionAEliminar, 1);

    this.cursosService.deleteCurso(idCursoAEliminar)
      .subscribe()

    this.inscripcionesService.getInscripciones()
      .subscribe((inscripciones) => {

       let inscripcionesPorEliminar = inscripciones.filter(f=>f.idCurso === idCursoAEliminar);
       
        for (let inscripcionPorEliminar of inscripcionesPorEliminar) {
          this.inscripcionesService.eliminarInscripcionPorId(inscripcionPorEliminar.id)
          this.listaInscripciones.eliminarInscripcionPorId(inscripcionPorEliminar.id)
        }

      });

    this.dataSource.data = [...this.dataSource.data];

  }

  detalleCurso(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute
    })
  }
}
