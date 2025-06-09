// src/app/models/cita.model.ts

import { Mascota } from './mascota.model';
import { Veterinario } from './veterinario.model';

export interface CitaRespuesta {
  id: number;
  fecha: string;       // Por ejemplo, "2025-06-16T09:00:00"
  motivo: string;
  tipoCita: string;    // Podrías definirlo como un string literal si lo necesitas (p.ej. 'PRESENCIAL')
  mascota: Mascota;    // La información completa de la mascota, para acceder a "mascota.nombre" por ejemplo.
  veterinario: Veterinario;
}
