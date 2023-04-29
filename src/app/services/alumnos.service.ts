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
    return this.http.get<Array<Alumno>>('http://localhost:3000/alumnos');
  }

  

  getAlumnoPorId(id: number): Observable<Alumno| undefined>  {

    return this.http.get<Alumno>('http://localhost:3000/alumnos/' + id)
    
  }


  postNewAlumno(data: any) {
    return this.http.post<Alumno>('http://localhost:3000/alumnos/', data)
  }



  putAlumno(data: any, id:number){
    return this.http.put<Alumno>('http://localhost:3000/alumnos/' + id , data)
  }

  deleteAlumno(id:number){
    return this.http.delete<Alumno>('http://localhost:3000/alumnos/' + id)

  }

}
