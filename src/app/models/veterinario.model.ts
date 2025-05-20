export class Veterinario {
  id?: number;
  nombre: string;
  especialidad: string;
  telefono?: string;
  email?: string;
  username: string;
  password: string;
  role: string;
  validado: boolean;

  constructor(
    nombre: string,
    especialidad: string,
    telefono: string = '',
    email: string = '',
    username: string,
    password: string,
    role: string = 'VETERINARIO',
    validado: boolean = false
  ) {
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.telefono = telefono;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
    this.validado = validado;
  }
}
