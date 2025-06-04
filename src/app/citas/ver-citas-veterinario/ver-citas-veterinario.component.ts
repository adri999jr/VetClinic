import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../service/citaService';
@Component({
  selector: 'app-ver-citas-veterinario',
  standalone: false,
  templateUrl: './ver-citas-veterinario.component.html',
  styleUrl: './ver-citas-veterinario.component.css'
})
export class VerCitasVeterinarioComponent implements OnInit {
  citas: any[] = [];
  error: string | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getCitasVeterinario().subscribe({
      next: data => this.citas = data,
      error: err => {
        this.error = 'Error al cargar las citas del veterinario';
        console.error(err);
      }
    });
  }
}