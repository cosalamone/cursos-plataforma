import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InscripcionesService } from 'src/app/services/inscripciones.service';


@Component({
  selector: 'app-tabla-cursos-por-id-alumno',
  templateUrl: './tabla-cursos-por-id-alumno.component.html',
  styleUrls: ['./tabla-cursos-por-id-alumno.component.scss']
})
export class TablaCursosPorIdAlumnoComponent {

  displayedColumns: string[] = ['nombreCurso', 'docenteACargo', 'fechaInicio'];
  dataSource!: MatTableDataSource<any, any>;

  constructor(
    public dialogRef: MatDialogRef<TablaCursosPorIdAlumnoComponent>,
    private inscripcionesService: InscripcionesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.inscripcionesService.getInscripcionDeCursosPorAlumno()

      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      )
  }

  detalleCursoPorIdAlumno(alumnoId: number): void {
    this.router.navigate([alumnoId], {
      relativeTo: this.activatedRoute
    })
  }
}
