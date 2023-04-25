import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, from, takeUntil } from 'rxjs';
import { DocentesService } from 'src/app/services/docentes.service';
import { FormAbmDocentesComponent } from './form-abm-docentes/form-abm-docentes.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/interfaces/docente';

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
    'curso',
    'opciones'
  ];

  dataSource!: MatTableDataSource<any, any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  destroyed$ = new Subject<void>();

  constructor(private docentesService: DocentesService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {

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


  abrirFormABMDocentes(){
    const dialog = this.matDialog.open(FormAbmDocentesComponent);

    dialog.afterClosed().subscribe((valor)=> {
      if (valor){
        let docente: Docente = valor;
        let newId = Math.max(...this.dataSource.data.map(x => x.id)) + 1;

        docente.id = newId;

        this.dataSource.data=[...this.dataSource.data, docente]
      }
    })
  }

  editarDocente(docente: Docente){
    const dialog = this.matDialog.open(FormAbmDocentesComponent, {
      data: {
        docente,
      },
    });

    dialog.afterClosed().subscribe((valor)=>{
      if(valor){
        let docente: Docente= valor;
        let idDocenteAModificar = docente.id;
        let posicionAEditar= this.dataSource.data.findIndex(
          (docente)=> docente.id === idDocenteAModificar
        );

        this.dataSource.data[posicionAEditar] = docente;
        this.dataSource = new MatTableDataSource(this.dataSource.data)
      }
    })

  }

eliminarDocente(docente: Docente): void{
 let idDocenteAEliminar = docente.id;
 let posicionAEliminar= this.dataSource.data.findIndex(
  (docente: Docente) => docente.id === idDocenteAEliminar
 );


 this.dataSource.data.splice(posicionAEliminar, 1);
 this.dataSource.data= [...this.dataSource.data];

}


}