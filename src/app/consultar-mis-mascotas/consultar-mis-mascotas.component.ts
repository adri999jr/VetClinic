import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MascotaService } from '../service/mascota.service';

@Component({
  selector: 'app-consultar-mis-mascotas',
  standalone: false,
  templateUrl: './consultar-mis-mascotas.component.html',
  styleUrl: './consultar-mis-mascotas.component.css'
})
export class ConsultarMisMascotasComponent implements OnInit {
  mascotas: any[] = [];
  error: string | null = null;

  constructor(private mascotaService: MascotaService) {}

  ngOnInit() {
    this.mascotaService.getMascotasCliente().subscribe({
      next: data => this.mascotas = data,
      error: err => {
        this.error = 'Error al cargar las mascotas del cliente.';
        console.error(err);
      }
    });
  }
}

