export interface MascotaDisplay {
  id_mascota: number;
  nombre: string;
  id_cliente: number;
  clienteUsername?: string; // Se llenará con información del cliente
  display?: string;         // Campo que usamos para mostrar en el select o donde se necesite
}
