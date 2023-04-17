import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {}

  getCursos(){
    return this.http.get('assets/cursos.json')
  }


}
