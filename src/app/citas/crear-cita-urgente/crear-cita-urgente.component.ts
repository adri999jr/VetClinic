// src/app/crear-cita-urgente/crear-cita-urgente.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../service/citaService';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string;    // username
  role: string;
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
  successMessage = '';
  errorMessage = '';
  veterinarioUsername = ''; // Extraído del token

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
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
        this.errorMessage = 'No tienes permisos para crear citas urgentes';
        this.router.navigate(['/login']);
        return;
      }
      this.veterinarioUsername = decoded.sub;
    } catch (error) {
      this.errorMessage = 'Token inválido';
      this.router.navigate(['/login']);
      return;
    }

    // Inicializamos el formulario. Aquí asumimos que se necesita:
    // - fecha (que puede dejarse por defecto a la fecha/hora actual en formato ISO sin segundos)
    // - motivo
    // - mascotaId (suponiendo que se requiere saber a qué mascota se le asigna la cita)
    // - tipoCita se fija como "URGENTE"
    this.citaForm = this.fb.group({
      fecha: [new Date().toISOString().substring(0, 16), Validators.required],
      motivo: ['', Validators.required],
      mascotaId: ['', Validators.required],
      tipoCita: ['URGENTE']
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.citaForm.invalid) {
      this.errorMessage = 'Completa todos los campos obligatorios';
      return;
    }

    // Se arma el DTO a partir del formulario y se adjunta el username del veterinario.
    const dto = {
      ...this.citaForm.value,
      veterinarioUsername: this.veterinarioUsername
    };

    this.citaService.crearCitaUrgente(dto).subscribe({
      next: (res) => {
        this.successMessage = 'Cita urgente creada con éxito';
        this.citaForm.reset();
      },
      error: (err) => {
        console.error('Error al crear cita urgente', err);
        this.errorMessage = err.error || 'Ocurrió un error inesperado';
      }
    });
  }
}
