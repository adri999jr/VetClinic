import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Puedes definir una interfaz para la entidad Cita. 
export interface Cita {
  id?: number;         // Opcional, en caso de que la entidad lo tenga
  fecha: string;       // En formato ISO, por ejemplo: "2025-06-01T09:00:00"
  motivo: string;
  mascotaId: number;
  // Agrega otros campos si los usas, por ejemplo, tipoCita, veterinario, etc.
}

@Injectable({ providedIn: 'root' })
export class CitaService {
  private apiUrl = 'http://localhost:8080/veterinaria/api/citas';

  constructor(private http: HttpClient) {}

  // 1. Obtener citas disponibles de un mes
  getCitasDelMes(year: number, month: number): Observable<Cita[]> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());
    return this.http.get<Cita[]>(`${this.apiUrl}/mes`, { params });
  }

  // 2. Verificar si una fecha está disponible
  estaDisponible(fecha: string): Observable<boolean> {
    const params = new HttpParams().set('fecha', fecha);
    return this.http.get<boolean>(`${this.apiUrl}/disponible`, { params });
  }

  // 3. Reservar una cita (cliente)
  reservarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/reservar`, cita);
  }

  // 4. Crear cita de urgencia (veterinario)
  crearUrgente(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.apiUrl}/urgente`, cita);
  }

  // 5. Obtener citas del cliente actual (según token)
  getCitasCliente(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/mis-citas`);
  }

  // 6. Obtener citas del veterinario actual (según token)
  getCitasVeterinario(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/veterinario`);
  }

  // 7. Cancelar una cita por ID
  cancelarCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 8. Obtener detalle de una cita por ID
  getCitaPorId(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  // En CitaService
// En CitaService
obtenerCitasDelMes(year: number, month: number): Observable<Cita[]> {
  return this.http.get<Cita[]>(`${this.apiUrl}/mes?year=${year}&month=${month}`);
}


}
