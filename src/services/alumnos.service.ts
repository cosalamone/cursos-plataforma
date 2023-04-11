import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) {}

  getAlumnos() {
    return this.http.get('assets/alumnos.json');
  }

  post() {
    // ...
  }


}
