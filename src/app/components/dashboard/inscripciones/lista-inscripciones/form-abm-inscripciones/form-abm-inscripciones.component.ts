import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from 'src/app/services/cursos.service';
import { Alumno, Curso } from 'src/interfaces';

@Component({
  selector: 'app-form-abm-inscripciones',
  templateUrl: './form-abm-inscripciones.component.html',
  styleUrls: ['./form-abm-inscripciones.component.scss']
})
export class FormAbmInscripcionesComponent implements OnInit {

  inscripcionForm: FormGroup;
  selectedValue: string | undefined;
  alumnos: Alumno[] = [];
  cursos: Curso[] = []; 



  idAlumnoControl = new FormControl('', [Validators.required]);
  idCursoControl = new FormControl('', [Validators.required]);


  constructor(public formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    @Inject(MAT_DIALOG_DATA) public data: { alumno: Alumno }) {

    this.inscripcionForm = this.formBuilder.group({
      idAlumno: this.idAlumnoControl,
      idCurso: this.idCursoControl,
    })

    this.inscripcionForm.valueChanges.subscribe(console.log)


    if (data) {
      this.inscripcionForm.patchValue(data['alumno']);
    }
  }


  ngOnInit(): void {
    this.alumnosService.getAlumnos().subscribe(
      {
        next: (listaAlumnos) => {
          this.alumnos = listaAlumnos
        }
      }
    )

    this.cursosService.getCursos().subscribe(
      {
        next: (listaCursos) => {
          this.cursos = listaCursos
        }
      }
    )
  }

}
