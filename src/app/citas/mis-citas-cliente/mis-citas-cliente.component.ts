import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../service/citaService';
@Component({
  selector: 'app-mis-citas-cliente',
  standalone: false,
  templateUrl: './mis-citas-cliente.component.html',
  styleUrl: './mis-citas-cliente.component.css'
})
export class MisCitasClienteComponent implements OnInit {
  citas: any[] = [];
  error: string | null = null;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getCitasCliente().subscribe({
      next: data => this.citas = data,
      error: err => {
        this.error = 'Error al cargar las citas del cliente';
        console.error(err);
      }
    });
  }
}
