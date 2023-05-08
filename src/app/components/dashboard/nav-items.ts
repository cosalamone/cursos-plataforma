 export interface NavItem {
  url: string;
  title:string;
}

const links: NavItem[] = [
  {
    url:'alumnos',
    title:'Alumnos',
  },
  {
    url:'cursos',
    title:'Cursos',
  },
  {
    url:'docentes',
    title:'Docentes',
  },
  {
    url:'usuarios',
    title:'Usuarios',
  }
]

export default links;
