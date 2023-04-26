import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { DocentesService } from 'src/app/services/docentes.service';
import { Docente } from 'src/interfaces/docente';

@Component({
  selector: 'app-detalle-docentes',
  templateUrl: './detalle-docentes.component.html',
  styleUrls: ['./detalle-docentes.component.scss']
})
export class DetalleDocentesComponent {
  panelOpenState = false;

  docente: Docente | undefined;
  
  constructor(private activatesRoute: ActivatedRoute,
    private docentesService: DocentesService,
    ) {
    console.log(this.activatesRoute.snapshot.params) //llega en forma de string

    this.docentesService.getDocentesPorId(parseInt(this.activatesRoute.snapshot.params['idDocente']))
    .subscribe((docente)=> this.docente = docente)
  }

}
