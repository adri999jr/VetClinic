import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../service/mascota.service';
import { ClienteService } from '../service/cliente.service';
import { Mascota } from '../models/mascota.model';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-modificar-historial',
  standalone: false,
  templateUrl: './modificar-historial.component.html',
  styleUrls: ['./modificar-historial.component.css']
})
export class ModificarHistorialComponent implements OnInit {
  nombreBusqueda: string = '';
  mascotas: Mascota[] = [];
  clientes: Cliente[] = [];
  mascotaSeleccionada: Mascota | null = null;
  nuevoHistorial: string = '';
  error: string = '';
  exito: string = '';

  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        this.error = 'Error al cargar los clientes.';
        console.error(err);
      }
    });
  }

  buscarMascotas(): void {
    this.error = '';
    this.exito = '';
    this.mascotaService.buscarPorNombre(this.nombreBusqueda).subscribe({
      next: (data: Mascota[]) => {
        this.mascotas = data.map(mascota => {
          const cliente = this.clientes.find(c => c.id === mascota.idCliente);
          return {
            ...mascota,
            usernameCliente: cliente ? cliente.username : 'Desconocido'
          };
        });
      },
      error: (err) => {
        this.error = 'Error al buscar mascotas.';
        console.error(err);
      }
    });
  }

  abrirModal(mascota: Mascota): void {
    this.mascotaSeleccionada = { ...mascota };
    this.nuevoHistorial = mascota.historial_medico || '';
  }

  guardarHistorial(): void {
    if (!this.mascotaSeleccionada) return;

    this.mascotaService.actualizarHistorial(
      this.mascotaSeleccionada.id_mascota!,
      this.nuevoHistorial
    ).subscribe({
      next: () => {
        const index = this.mascotas.findIndex(m => m.id_mascota === this.mascotaSeleccionada!.id_mascota);
        if (index !== -1) {
          this.mascotas[index].historial_medico = this.nuevoHistorial;
        }
        this.exito = 'Historial actualizado correctamente.';
        this.mascotaSeleccionada = null;
      },
      error: (err) => {
        this.error = 'Error al guardar el historial médico.';
        console.error(err);
      }
    });
  }
}
