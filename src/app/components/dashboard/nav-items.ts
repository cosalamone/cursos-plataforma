 export interface NavItem {
  url: string;
  title:string;
  requiresAdmin: boolean;
}

const links: NavItem[] = [
  {
    url:'alumnos',
    title:'Alumnos',
    requiresAdmin: false,
  },
  {
    url:'cursos',
    title:'Cursos',
    requiresAdmin: false,
  },
  {
    url:'docentes',
    title:'Docentes',
    requiresAdmin: true,
  },
  {
    url:'usuarios',
    title:'Usuarios',
    requiresAdmin: true,
  }
]

export default links;

