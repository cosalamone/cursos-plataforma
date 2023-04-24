import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Curso } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {}

  getCursos(){
    return this.http.get('assets/cursos.json')
  }

  getCursoPorId(id:number): Observable<Curso | undefined>{
    let cursoPorId = this.http.get<Array<Curso>>('assets/cursos.json')
    .pipe(
      map((cursos: Array<Curso>) => cursos.find((curso) => curso.id === id))
    )
    return cursoPorId
  }


}
