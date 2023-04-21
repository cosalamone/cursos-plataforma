import { Injectable } from '@angular/core';
import { Docente } from 'src/interfaces/docente';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  http: any;

  constructor() { }

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
}
