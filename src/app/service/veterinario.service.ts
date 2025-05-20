import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8080/register/veterinario';

  constructor(private http: HttpClient) {}

  registerVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.apiUrl, veterinario);
  }
}
