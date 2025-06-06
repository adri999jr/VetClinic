import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../service/citaService';
import { MascotaService } from '../../service/mascota.service';
import { Mascota } from '../../models/mascota.model';
@Component({
  selector: 'app-ver-citas-veterinario',
  standalone: false,
  templateUrl: './ver-citas-veterinario.component.html',
  styleUrl: './ver-citas-veterinario.component.css'
})
export class VerCitasVeterinarioComponent implements OnInit {
  username: string = '';
  mascotas: Mascota[] = [];
  error: string | null = null;

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    // Puede incluir lógica de inicialización si fuera necesario.
  }

  buscarMascotas(): void {
    if (!this.username.trim()) {
      this.error = "Por favor, ingresa un username válido.";
      this.mascotas = [];
      return;
    }
    // Llamada al servicio para obtener las mascotas del cliente
    this.mascotaService.getMascotasByUsername(this.username).subscribe({
      next: (data: Mascota[]) => {
        this.mascotas = data;
        this.error = null;
      },
      error: (err) => {
        this.error = "Error al cargar las mascotas.";
        this.mascotas = [];
      }
    });
  }
}