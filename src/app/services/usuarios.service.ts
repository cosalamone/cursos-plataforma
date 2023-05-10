import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>('http://localhost:3000/usuarios')

  }

  getUsuarioPorId(id:number): Observable<Usuario| undefined> {
    return this.http.get<Usuario>('http://localhost:3000/usuarios/' + id)
  }

  postUsuario(data: any) {
    return this.http.post<Array<Usuario>>('http://localhost:3000/usuarios/',  data)
  }

  putUsuario(data: any, id: number) {
    return this.http.put<Array<Usuario>>('http://localhost:3000/usuarios/' + id, data)
  }

  deleteUsuario(id:number){
    return this.http.delete<Array<Usuario>>('http://localhost:3000/usuarios/' + id)

  }

}
