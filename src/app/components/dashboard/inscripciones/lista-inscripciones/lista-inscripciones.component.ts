import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../store/inscripciones.actions';
import { Observable } from 'rxjs';
import { State } from '../store/inscripciones.reducer';
import { selectInscripcionesState } from '../store/inscripciones.selectors';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {

  state$: Observable<State>

  constructor(private store: Store) {
    this.state$ = this.store.select(selectInscripcionesState)
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
  }

  eliminarInscripcionPorId(id: number): void{
    this.store.dispatch(InscripcionesActions.deleteInscripcion({id}))
  } // se usa en el html de la futura tabla de inscripciones - 

}
