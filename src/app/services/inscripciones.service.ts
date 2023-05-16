import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/interfaces';
import { Inscripcion } from 'src/interfaces/inscripciones';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private http: HttpClient) {
  }

  getAlumnosDeIdCurso(idCurso:number | undefined): Observable<Array<Inscripcion>> {
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones?idCurso=' + idCurso)
  }

  getCursosDeIdAlumno(idAlumno: number | undefined): Observable<Array<Inscripcion>>{
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones?idAlumno=' + idAlumno)
  }

  deleteAlumnoDeCurso(idInscripcion: number | undefined){
    return this.http.delete('http://localhost:3000/inscripciones/' + idInscripcion )
  }
  deleteCursoDeAlumno(idInscripcion: number | undefined){
    return this.http.delete('http://localhost:3000/inscripciones/' + idInscripcion )
  }
}


