import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/interfaces';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {

    const apellido = value.apellido.toUpperCase();
    const newDato = `${value.nombre}${apellido}`

    return newDato;
  }

}
