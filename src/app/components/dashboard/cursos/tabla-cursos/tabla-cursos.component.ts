import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Alumno, Curso, Usuario } from 'src/interfaces';
import { FormAbmCursosComponent } from './form-abm-cursos/form-abm-cursos.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';


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


  ) {

    this.authUserObs$ = this.authService.obtenerUsuarioAutenticado();


    // FX PARA OBTENER ARRAY DE CURSOS DE CURSOS.JSON (A FUTURO UNA API) - Utiliza CursosService
    this.cursosService
      .getCursos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }

  abrirABMCurso(): void {
    const dialog = this.matDialog.open(FormAbmCursosComponent);

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        let curso: Curso = valor;
        let newId = Math.max(...this.dataSource.data.map(x => x.id)) + 1;

        curso.id = newId;

        this.cursosService.postNewCurso(curso)
        .subscribe()
        this.dataSource.data= [...this.dataSource.data, curso];
      }
    })
  }

  editarCurso(curso: Alumno) {
    const dialog = this.matDialog.open(FormAbmCursosComponent, {
      data: {
        curso,
      }
    });

    dialog.afterClosed().subscribe((valor)=> {
      if (valor ){
        let curso: Curso = valor;
        let idCursoModificar = curso.id;
        let posicionAEditar = this.dataSource.data.findIndex(
          (alumno)=> alumno.id === idCursoModificar
        );
        this.dataSource.data[posicionAEditar]= curso;

        this.cursosService.putCurso(curso, idCursoModificar)
        .subscribe()
        this.dataSource= new MatTableDataSource(this.dataSource.data)
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

    this.dataSource.data = [...this.dataSource.data];
   
  }

  detalleCurso(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute
    })
  }
}
