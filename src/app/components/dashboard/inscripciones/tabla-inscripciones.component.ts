import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './tabla-inscripciones.component.html',
  styleUrls: ['./tabla-inscripciones.component.scss']
})
export class TablaInscripcionesComponent {

  displayedColumns: string[] = [
    'id',
    'curso',
    'docente',
    'fecha-inicio',
    'fecha-finalizacion',
    'cant-alumnos-inscriptos',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.alumnosService
      .getAlumnos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }

  abrirFormABMInscriociones(){};

  editarInscripciones(){};

  eliminarInscipcion(){};


  detalleInscipcion(){};
}
