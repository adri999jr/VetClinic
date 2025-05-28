import { Component } from '@angular/core';

@Component({
  selector: 'app-home-veterinario',
  standalone: false,
  templateUrl: './home-veterinario.component.html',
  styleUrl: './home-veterinario.component.css'
})
export class HomeVeterinarioComponent {
  nombreVeterinario = 'Dr. Juan Pérez'; // Simulado, idealmente obtenido del login o API

}
