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
}
