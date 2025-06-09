import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../service/citaService';
import { CitaRespuesta } from '../../models/citaRespuessta.model';
@Component({
  selector: 'app-mis-citas-cliente',
  standalone: false,
  templateUrl: './mis-citas-cliente.component.html',
  styleUrl: './mis-citas-cliente.component.css'
})
export class MisCitasClienteComponent implements OnInit {
  citas: CitaRespuesta[] = [];
  errorMessage: string | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.obtenerMisCitas();
  }

  obtenerMisCitas(): void {
    this.citaService.getMisCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = "No se pudieron cargar tus citas.";
        this.citas = [];
      }
    });
  }
}
