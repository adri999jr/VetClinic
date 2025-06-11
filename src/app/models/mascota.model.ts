export interface Mascota {
  id_mascota?: number;
  idCliente: number;
  nombre: string;
  especie: 'PERRO' | 'GATO' | 'CONEJO' | 'PERIQUITO'  | 'LORO' | 'HAMSTER' ;
  raza?: string;
  fecha_nacimiento: string;
  historial_medico?: string;
  usernameCliente?: string;
}
