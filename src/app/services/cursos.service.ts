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

    return this.http.get('http://localhost:3000/cursos/')
  }

  getCursoPorId(id:number): Observable<Curso | undefined>{

    return this.http.get<Curso>('http://localhost:3000/cursos/' + id)
  
  }

  postNewCurso(data: any){
    return this.http.post<Curso>('http://localhost:3000/cursos/', data)
  }

  putCurso(data: any, id:number){
    return this.http.put<Curso>('http://localhost:3000/cursos/' + id , data)
  }

  deleteCurso(id:number){
    return this.http.delete<Curso>('http://localhost:3000/cursos/' + id)

  }


}
