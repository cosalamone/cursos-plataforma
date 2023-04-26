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
    return new Promise((resolve, reject)=>{
      fetch('assets/docentes.json')
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

  getDocentesPorId(id:number): Observable<Docente | undefined>{
    let docentePorId = this.http.get<Array<Docente>>('assets/docentes.json')
    .pipe(
      map((docentes: Array<Docente>)=> docentes.find((docente)=> docente.id === id))
    )

    return docentePorId
  }
}
