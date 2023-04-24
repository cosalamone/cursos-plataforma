import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Alumno } from 'src/interfaces/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Array<Alumno>> {
    return this.http.get<Array<Alumno>>('assets/alumnos.json');
  }

  getAlumnoPorId(id: number): Observable<Alumno| undefined>  {
    let alumnoPorId = this.http.get<Array<Alumno>>('assets/alumnos.json')
      .pipe(
        map((alumnos: Array<Alumno>) => alumnos.find((alumno) => alumno.id === id))
      )
      return alumnoPorId
  }


  post() {
    // ...
  }


}
