export class Cliente {
  id?: number;
  dni: string;
  nombre: string;
  email?: string;
  telefono?: string;
  direccion: string;
  username: string;
  password: string;
  role: string;
  mascotas: any[];

  constructor(
    dni: string,
    nombre: string,
    direccion: string,
    username: string,
    password: string,
    email: string = '',
    telefono: string = '',
    role: string = 'CLIENTE',
    mascotas: any[] = []
  ) {
    this.dni = dni;
    this.nombre = nombre;
    this.direccion = direccion;
    this.username = username;
    this.password = password;
    this.email = email;
    this.telefono = telefono;
    this.role = role;
    this.mascotas = mascotas;
  }
}
