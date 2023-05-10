import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable <Array<Usuario>>{
    return this.http.get<Array<Usuario>>('http://localhost:3000/usuarios')

  }
}
