import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-mascotas-home',
  standalone: false,
  templateUrl: './gestion-mascotas-home.component.html',
  styleUrls: ['./gestion-mascotas-home.component.css']
})
export class GestionMascotasHomeComponent {
  vistaActual: 'lista' | 'formulario' = 'lista';
  mascotaSeleccionada: any = null;

  mostrarLista() {
    this.vistaActual = 'lista';
    this.mascotaSeleccionada = null;
  }

  crearMascota() {
    this.vistaActual = 'formulario';
    this.mascotaSeleccionada = null;
  }

  editarMascota(mascota: any) {
    this.vistaActual = 'formulario';
    this.mascotaSeleccionada = mascota;
  }
}
