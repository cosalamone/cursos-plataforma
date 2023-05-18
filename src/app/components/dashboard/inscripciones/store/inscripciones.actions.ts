import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripcion } from 'src/interfaces';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Inscripcion[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Delete Inscripcion': props<{ id: number }>(),
    'Delete Inscripcion Success': props<{ data: number }>(),
    'Delete Inscripcion Failure': props<{ error: unknown }>(),
  }
});
