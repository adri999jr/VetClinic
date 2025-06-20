import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private apiUrl = 'http://localhost:8080/veterinaria/api/mascotas'; // Ajusta si tu ruta es distinta

  constructor(private http: HttpClient) {}

  crearMascota(mascota: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

return this.http.post<any>(`${this.apiUrl}`, mascota, { headers });
  }
  obtenerMascotas(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
getMascotasCliente() {
    return this.http.get<any[]>(`${this.apiUrl}/cliente`);
  }

  getMascotasByUsername(username: string) {
  return this.http.get<any[]>(`${this.apiUrl}/cliente/${username}`);
}

buscarPorNombre(nombre: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
}

actualizarHistorial(id: number, historial: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}/historial`, historial, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
}
