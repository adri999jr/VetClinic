import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeterinarioService } from '../service/veterinario.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-validar-veterinario',
  standalone: false,
  templateUrl: './validar-veterinario.component.html',
  styleUrl: './validar-veterinario.component.css'
})
export class ValidarVeterinarioComponent implements OnInit {
  veterinarios: any[] = [];

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role !== 'ADMIN') {
        this.router.navigate(['/login']);
        return;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarTodosVeterinarios();
  }

  cargarTodosVeterinarios(): void {
    this.veterinarioService.obtenerTodos().subscribe({
      next: (data) => {
        this.veterinarios = data.filter(vet => vet.role !== 'ADMIN');
      },
      error: (err) => console.error('Error al cargar veterinarios', err)
    });
  }

  toggleValidacion(vet: any): void {
    this.veterinarioService.toggleValidado(vet.username).subscribe({
      next: (resp: any) => {
        vet.validado = resp.validado;
      },
      error: (err) => console.error('Error al actualizar validación', err)
    });
  }
}
