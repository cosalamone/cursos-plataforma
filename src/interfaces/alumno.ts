export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  telefono: number;
  email: string;
  cursos?: string[];
}
