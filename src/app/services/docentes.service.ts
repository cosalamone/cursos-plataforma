import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Docente } from 'src/interfaces/docente';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  constructor(private http: HttpClient) { }

  getDocentes() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/docentes/')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let arrayDocentes = data;

          resolve(arrayDocentes)

        })
        .catch((error) => {
          console.error(error);
          reject("error")
        });
    })
  }

  getDocentesPorId(id: number): Observable<Docente | undefined> {

    return this.http.get<Docente>('http://localhost:3000/docentes/' + id)

  }

  postNewDocente(data: any) {
    return this.http.post<Docente>('http://localhost:3000/docentes/', data)
  }
}
