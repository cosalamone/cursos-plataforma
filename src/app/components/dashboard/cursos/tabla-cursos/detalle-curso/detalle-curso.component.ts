import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { Curso } from 'src/interfaces';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})

export class DetalleCursoComponent {
  panelOpenState = false;

  curso: Curso | undefined;

  constructor(private activatesRoute: ActivatedRoute,
    private cursosService: CursosService){

      console.log(this.activatesRoute.snapshot.params)

      this.cursosService.getCursoPorId(parseInt(this.activatesRoute.snapshot.params['idCurso']))
      .subscribe((curso)=> this.curso = curso)
    }

  }

