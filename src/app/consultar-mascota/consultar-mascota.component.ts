import { Component } from '@angular/core';
import { MascotaService } from '../service/mascota.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-mascota',
  standalone: false,
  templateUrl: './consultar-mascota.component.html',
  styleUrl: './consultar-mascota.component.css'
})
export class ConsultarMascotasComponent implements OnInit {
  mascotas: any[] = [];
  error: string | null = null;

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data) => {
        this.mascotas = data;
      },
      error: (err) => {
        this.error = 'Error al obtener mascotas';
        console.error(err);
      }
    });
  }
}
