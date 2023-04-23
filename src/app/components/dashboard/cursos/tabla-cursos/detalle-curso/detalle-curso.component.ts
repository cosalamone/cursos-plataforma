import { Component } from '@angular/core';
import { Curso } from 'src/interfaces';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.scss']
})
export class DetalleCursoComponent {
  panelOpenState = false;

  curso: Curso | undefined;

  constructor(){}

  }

