import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Docente } from 'src/interfaces/docente';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  constructor(private http: HttpClient) { }

  getDocentes(): Observable<Array<Docente>> {
    return this.http.get<Array<Docente>>('http://localhost:3000/docentes/')
  
  }

  getDocentesPorId(id: number): Observable<Docente | undefined> {

    return this.http.get<Docente>('http://localhost:3000/docentes/' + id)

  }

  postNewDocente(data: any) {
    return this.http.post<Docente>('http://localhost:3000/docentes/', data)
  }

  putDocente(data: any, id:number){
    return this.http.put<Docente>('http://localhost:3000/docentes/' + id , data)
  }

  deleteDocente(id:number){
    return this.http.delete<Docente>('http://localhost:3000/docentes/' + id)

  }
}
