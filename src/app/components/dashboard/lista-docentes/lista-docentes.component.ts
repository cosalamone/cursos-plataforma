import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, from, takeUntil } from 'rxjs';
import { DocentesService } from 'src/app/services/docentes.service';

@Component({
  selector: 'app-lista-docentes',
  templateUrl: './lista-docentes.component.html',
  styleUrls: ['./lista-docentes.component.scss']
})
export class ListaDocentesComponent implements OnDestroy {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'curso'
  ];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  destroyed$ = new Subject<void>();

  constructor(private docentesService: DocentesService) {

    let listaDocentes = docentesService.getDocentes();
    const listaDocentesObs$ = from(listaDocentes)
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((data) => (this.dataSource = new MatTableDataSource(data as any)))
  }
  ngOnDestroy(): void {
    console.log('componente destruido')
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
