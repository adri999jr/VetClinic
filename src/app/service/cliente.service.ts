import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private registrarClienteUrl = 'http://localhost:8080/register/cliente';
  private apiUrl = 'http://localhost:8080/veterinaria/api/clientes'
  constructor(private http: HttpClient) {}

  registerCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.registrarClienteUrl, cliente);
  }


    loginCliente(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  getClientePorUsername(username: string): Observable<Cliente> {
      return this.http.get<Cliente>(`${this.apiUrl}/username/${username}`);
    }
}
