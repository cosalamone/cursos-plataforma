import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/interfaces/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Array<Alumno>> {
    return this.http.get<Array<Alumno>>('assets/alumnos.json');
  }

  post() {
    // ...
  }


}
