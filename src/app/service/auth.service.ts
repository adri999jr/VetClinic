import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Veterinario } from '../models/veterinario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/veterinaria/api/register'; // URL actualizada para crear un cliente

  constructor(private http: HttpClient) {}

  // Método para registrar un cliente
  registerCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/cliente`, cliente);
  }

  // Método para registrar un veterinario
  registerVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/veterinario`, veterinario);
  }
}
