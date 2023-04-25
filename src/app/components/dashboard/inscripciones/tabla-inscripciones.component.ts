import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from '../../../services/cursos.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './tabla-inscripciones.component.html',
  styleUrls: ['./tabla-inscripciones.component.scss']
})
export class TablaInscripcionesComponent {

  displayedColumns: string[] = [
    'id',
    'curso',
    // 'docente',
    // 'fecha-inicio',
    // 'fecha-finalizacion',
    // 'cant-alumnos-inscriptos',
    // 'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.inscripcionesService
      .getInscripciones()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );

    // this.inscripcionesService.getInscripcionesPorCurso(1).subscribe(

    //   (data) => (this.dataSource = new MatTableDataSource(data as any))
    // )


  }



  abrirFormABMInscriociones() { };

  editarInscripciones() { };

  eliminarInscipcion() { };


  detalleInscipcion() { };
}
