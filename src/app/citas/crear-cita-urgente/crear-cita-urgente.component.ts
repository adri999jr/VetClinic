// src/app/crear-cita-urgente/crear-cita-urgente.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MascotaService } from '../../service/mascota.service';
import { ClienteService } from '../../service/cliente.service';
import { VeterinarioService } from '../../service/veterinario.service';
import { Cliente } from '../../models/cliente.model';
import { CitaService } from '../../service/citaService';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-crear-cita-urgente',
  templateUrl: './crear-cita-urgente.component.html',
  styleUrls: ['./crear-cita-urgente.component.css'],
  standalone: false
})
export class CrearCitaUrgenteComponent implements OnInit {
  citaForm!: FormGroup;
  mascotas: any[] = [];      // Se llenarán desde MascotaService  
  veterinarios: any[] = [];  // Se llenarán desde VeterinarioService  
  clientes: Cliente[] = [];  // Lista de clientes para enriquecer la información de cada mascota
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private veterinarioService: VeterinarioService,
    private citaService: CitaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Validación de token y roles
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'No estás autenticado';
      this.router.navigate(['/login']);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role !== 'VETERINARIO') {
        this.errorMessage = 'No tienes permisos para crear citas urgentes';
        this.router.navigate(['/login']);
        return;
      }
    } catch (error) {
      this.errorMessage = 'Token inválido';
      this.router.navigate(['/login']);
      return;
    }

    // Construcción del formulario reactivo sin el campo de fecha
    this.citaForm = this.fb.group({
      motivo: ['', Validators.required],
      mascotaId: ['', Validators.required],
      veterinarioId: ['', Validators.required],
      tipoCita: ['URGENCIA']  // Campo fijo
    });

    // Cargar datos reales desde la API:
    // Primero, cargamos los clientes para luego mapear la información en las mascotas.
    this.cargarClientes();
    this.cargarVeterinarios();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        // Una vez disponibles los clientes, se cargan y enriquecen las mascotas.
        this.cargarMascotas();
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
        this.errorMessage = 'No se pudieron cargar los clientes';
      }
    });
  }

  cargarMascotas(): void {
    this.mascotaService.obtenerMascotas().subscribe({
      next: (data: any[]) => {
        // Se mapearán las mascotas para agregar un campo "display" enriquecido con el username del cliente.
        this.mascotas = data.map(mascota => {
          const cliente = this.clientes.find(cli => cli.id === mascota.id_cliente);
          return {
            ...mascota,
            display: cliente ? `${mascota.nombre} (${cliente.username})` : mascota.nombre
          };
        });
      },
      error: (err) => {
        console.error('Error al cargar mascotas', err);
        this.errorMessage = 'No se pudieron cargar las mascotas';
      }
    });
  }

  cargarVeterinarios(): void {
    this.veterinarioService.obtenerTodos().subscribe({
      next: (data: any[]) => {
        this.veterinarios = data;
      },
      error: (err) => {
        console.error('Error al cargar veterinarios', err);
        this.errorMessage = 'No se pudieron cargar los veterinarios';
      }
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.citaForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios';
      return;
    }

    // Se arma el DTO incluyendo la fecha actual (que se asigna aquí)
    const dto = {
      ...this.citaForm.value,
      fecha: new Date().toISOString(), // Fecha actual en formato ISO
    };

    this.citaService.crearCitaUrgente(dto).subscribe({
      next: () => {
        this.successMessage = 'Cita urgente creada correctamente';
        // Reiniciar el formulario manteniendo el valor por defecto de 'tipoCita'
        this.citaForm.reset({ tipoCita: 'URGENTE' });
      },
      error: (err) => {
        console.error('Error al crear la cita urgente', err);
        this.errorMessage = err.error || 'Ocurrió un error inesperado';
      }
    });
  }
}
