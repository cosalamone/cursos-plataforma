import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from 'src/interfaces/inscripciones';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  constructor(private http: HttpClient) {
  }

  getInscripciones(): Observable<Array<Inscripcion>>{
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones')

  }

  getAlumnosDeIdCurso(idCurso:number | undefined): Observable<Array<Inscripcion>> {
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones?idCurso=' + idCurso)
  }

  getInscripcionesPorDeIdAlumno(idAlumno: number | undefined): Observable<Array<Inscripcion>>{ 
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones?idAlumno=' + idAlumno)
  }

  getInscripcionesPorIdDocente(idDocente:number | undefined): Observable<Array<Inscripcion>>{ 
    return this.http.get<Array<Inscripcion>>('http://localhost:3000/inscripciones?idAlumno=' + idDocente)
  }

  postNewInscripcion(inscripcion: any){
    return this.http.post<Inscripcion>('http://localhost:3000/inscripciones', inscripcion)
  }

  eliminarInscripcionPorId(idInscripcion: number | undefined){
    return this.http.delete('http://localhost:3000/inscripciones/' + idInscripcion )
  }


 
}


