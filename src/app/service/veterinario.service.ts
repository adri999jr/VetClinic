import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8080/veterinaria/api';

  constructor(private http: HttpClient) {}

  registerVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/register/veterinario`, veterinario);
  }

  loginVeterinario(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/veterinarios/login`, body)
      .pipe(
        tap(response => {
          // Guardar token en localStorage al hacer login
          if(response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  obtenerTodos() {
    return this.http.get<any[]>(`${this.apiUrl}/veterinarios`);
  }

 toggleValidado(username: string) {
  return this.http.put<{ validado: boolean }>(`http://localhost:8080/veterinaria/api/veterinarios/validar/${username}`, {});
}
   getVeterinarioPorUsername(username: string): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/veterinarios/username/${username}`);
  }

  obtenerNoValidados(){
    return this.http.get<any[]>(`${this.apiUrl}/veterinarios/pendientes`);
  }
}
