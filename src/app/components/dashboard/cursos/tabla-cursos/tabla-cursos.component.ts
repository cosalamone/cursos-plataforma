import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from 'src/app/services/cursos.service';


@Component({
  selector: 'app-tabla-cursos',
  templateUrl: './tabla-cursos.component.html',
  styleUrls: ['./tabla-cursos.component.scss']
})
export class TablaCursosComponent {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'duracion',
    'docente'];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(
    private cursosService: CursosService
  ) {
    // FX PARA OBTENER ARRAY DE CURSOS DE CURSOS.JSON (A FUTURO UNA API) - Utiliza CursosService
    this.cursosService
      .getCursos()
      .subscribe(
        (data) => (this.dataSource = new MatTableDataSource(data as any))
      );
  }
}
