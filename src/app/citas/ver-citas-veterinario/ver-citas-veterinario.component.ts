import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../service/citaService';
import { CitaRespuesta } from '../../models/citaRespuessta.model';
@Component({
  selector: 'app-ver-citas-veterinario',
  standalone: false,
  templateUrl: './ver-citas-veterinario.component.html',
  styleUrl: './ver-citas-veterinario.component.css'
})
export class VerCitasVeterinarioComponent implements OnInit {
  citas: CitaRespuesta[] = [];
  errorMessage = '';

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.obtenerCitasFuturas();
  }

  obtenerCitasFuturas(): void {
    this.citaService.getCitasVeterinario().subscribe({
      next: (data: any[]) => {
        const hoy = new Date();
        this.citas = data.filter(cita => new Date(cita.fecha) > hoy);
      },
      error: (err) => {
        console.error('Error al obtener citas', err);
        this.errorMessage = 'No se pudieron cargar las citas futuras';
      }
    });
  }
}