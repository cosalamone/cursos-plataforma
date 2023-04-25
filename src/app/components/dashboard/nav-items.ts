 interface NavItem {
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
    url:'login',
    title:'Cerrar sesión',
  }
]

export default links;
