import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Inscripcion } from 'src/interfaces';
import { Curso } from 'src/interfaces/cursos';

@Injectable({
  providedIn: 'root',
})

export class InscripcionesService {

  constructor(private http: HttpClient) { }

  getInscripciones(): Observable<Array<Inscripcion>> {
    return this.http.get<Array<Inscripcion>>('assets/inscripciones.json')
  }

  getInscripcionesPorCurso(idCurso: number): Observable<Inscripcion | undefined> {
    let inscripcionesPorCurso = this.http.get<Array<Inscripcion>>('assets/inscripciones.json')
      .pipe(
        map((inscripciones) => inscripciones.find((inscripcion) => inscripcion.idCurso === idCurso))
      )
    return inscripcionesPorCurso
  }

  getInscripcionesPorAlumno(idAlumno: number): Observable<Inscripcion | undefined> {
    let inscripcionesPorAlumno = this.http.get<Array<Inscripcion>>('assets/inscripciones.json')
      .pipe(
        map((inscripciones) => inscripciones.find((inscripcion) => inscripcion.idCurso === idAlumno))
      )
    console.log(inscripcionesPorAlumno)
    return inscripcionesPorAlumno
  }

  getInscripcionDeCursosPorAlumno() {
    return this.http.get<Array<Curso>>('assets/arrayCursosPorAlumno.json')
  }
}
