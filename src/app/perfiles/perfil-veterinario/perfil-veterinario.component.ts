import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { VeterinarioService } from '../../service/veterinario.service';
import { Veterinario } from '../../models/veterinario.model';

interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-perfil-veterinario',
  standalone: false,
  templateUrl: './perfil-veterinario.component.html',
  styleUrls: ['./perfil-veterinario.component.css']
})
export class PerfilVeterinarioComponent implements OnInit {
  veterinario: Veterinario | null = null;
  error: string | null = null;

  constructor(private veterinarioService: VeterinarioService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const username = decoded.sub;

        this.veterinarioService.getVeterinarioPorUsername(username).subscribe({
          next: (veterinario) => this.veterinario = veterinario,
          error: () => this.error = 'No se pudo cargar el perfil.'
        });
      } catch {
        this.error = 'Token inválido.';
      }
    } else {
      this.error = 'No hay token de autenticación.';
    }
  }
}
