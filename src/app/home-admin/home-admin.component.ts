import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

  constructor(private router: Router) {} 

  goToValidarVeterinarios() {
    this.router.navigate(['/admin/validar/veterinario']);
  }

  goToClientes() {
    this.router.navigate(['/admin/clientes']);
  }

  goToVeterinarios() {
    this.router.navigate(['/admin/veterinarios']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
