import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { CursosService } from 'src/app/services/cursos.service';
import { Alumno, Curso, Inscripcion } from 'src/interfaces';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-form-abm-inscripciones',
  templateUrl: './form-abm-inscripciones.component.html',
  styleUrls: ['./form-abm-inscripciones.component.scss']
})
export class FormAbmInscripcionesComponent implements OnInit, OnDestroy {

  inscripcionForm: FormGroup;
  selectedValue: string | undefined;
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  cursoSeleccionadoControl = new FormControl<Curso | null>(null)

  idAlumnoControl = new FormControl<number | null>(null, [Validators.required]);
  idCursoControl = new FormControl<number | null>(null, [Validators.required]);
  idDocenteControl = new FormControl<number | null>(null, [Validators.required]);

  destroyed$ = new Subject<void>()

  constructor(public formBuilder: FormBuilder,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private store: Store,
    private dialogRef: DialogRef<FormAbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alumno: Alumno }) {



    this.inscripcionForm = this.formBuilder.group({
      idAlumno: this.idAlumnoControl,
      idCurso: this.idCursoControl,
      idDocente: this.idDocenteControl,
    })
    

    this.cursoSeleccionadoControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    )
      .subscribe({
        next: (curso) => {
          if (curso) {
            this.idDocenteControl.setValue(curso.docente);
            this.idCursoControl.setValue(curso.id)
          }
        }
      })


    if (data) {
      this.inscripcionForm.patchValue(data['alumno']);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
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

  guardarInscripcion(): void {
    this.store.dispatch(InscripcionesActions.createInscripcion({
      data: this.inscripcionForm.value as Inscripcion,
    }))

    this.dialogRef.close();
  }

}
