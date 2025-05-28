import { Component, OnInit } from '@angular/core';
import { VeterinarioService } from '../service/veterinario.service';

@Component({
  selector: 'app-validar-veterinario',
  standalone: false,
  templateUrl: './validar-veterinario.component.html',
  styleUrl: './validar-veterinario.component.css'
})
export class ValidarVeterinarioComponent implements OnInit {
veterinarios: any[] = [];

  constructor(private veterinarioService: VeterinarioService) {}

  ngOnInit(): void {
    this.cargarVeterinarios();
  }

  cargarVeterinarios(): void {
    this.veterinarioService.obtenerTodos().subscribe({
      next: (data) => this.veterinarios = data,
      error: (err) => console.error('Error al cargar veterinarios', err)
    });
  }

  toggleValidacion(vet: any): void {
    this.veterinarioService.toggleValidado(vet.id).subscribe({
      next: (resp: any) => {
        vet.validado = resp.validado;
      },
      error: (err) => console.error('Error al actualizar validación', err)
    });
  }
}
