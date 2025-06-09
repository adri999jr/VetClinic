import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../service/mascota.service';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

// Definición de la interfaz para Cliente (ajústala según tus campos)
export interface Cliente {
  id: number;
  username: string;
  // Agrega otros campos si es necesario
}

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
  standalone: false
})
export class CrearMascotaComponent implements OnInit {
  mascotaForm!: FormGroup;
  especies: string[] = ['PERRO', 'GATO', 'PAJARO', 'OTRO'];
  clientes: Cliente[] = []; // Array que se llenará con la lista de clientes para el desplegable
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.errorMessage = 'No estás autenticado';
      this.router.navigate(['/login']);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role !== 'VETERINARIO') {
        this.errorMessage = 'No tienes permisos para crear mascotas';
        this.router.navigate(['/login']);
        return;
      }
    } catch (error) {
      this.errorMessage = 'Token inválido';
      this.router.navigate(['/login']);
      return;
    }

    // Construir el formulario
    this.mascotaForm = this.fb.group({
      idCliente: ['', Validators.required],
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      fecha_nacimiento: ['', Validators.required],
      historial_medico: ['']
    });

this.clienteService.getClientes().subscribe(
  (clientes: any[]) => {
    this.clientes = clientes;
  },
  (err) => {
    console.error('Error al cargar clientes', err);
    this.errorMessage = 'No se pudo cargar la lista de clientes';
  }
);

  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.mascotaForm.invalid) {
      this.errorMessage = 'Completa todos los campos obligatorios';
      return;
    }

    // Se envía el valor del formulario, en donde 'idCliente' es el id seleccionado del desplegable
    this.mascotaService.crearMascota(this.mascotaForm.value).subscribe({
      next: () => {
        this.successMessage = 'Mascota creada con éxito';
        this.mascotaForm.reset();
      },
      error: (err) => {
        console.error('Error al crear mascota', err);
        if (err.status === 404) {
          this.errorMessage = err.error || 'Cliente no encontrado';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al crear la mascota';
        }
      }
    });
  }
}
