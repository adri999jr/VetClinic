import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '../../service/citaService';
import { MascotaService } from '../../service/mascota.service';
@Component({
  selector: 'app-crear-cita-urgente',
  standalone: false,
  templateUrl: './crear-cita-urgente.component.html',
  styleUrl: './crear-cita-urgente.component.css'
})

export class CrearCitaUrgenteComponent implements OnInit {
  formUrgente: FormGroup;
  mascotas: any[] = [];
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private mascotaService: MascotaService
  ) {
    this.formUrgente = this.fb.group({
      fecha: ['', Validators.required],
      motivo: ['', Validators.required],
      mascotaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mascotaService.obtenerMascotas().subscribe(data => {
      this.mascotas = data;
    });
  }

  crearUrgente(): void {
    if (this.formUrgente.valid) {
      const cita = {
        fecha: this.formUrgente.value.fecha,
        motivo: this.formUrgente.value.motivo,
        mascotaId: this.formUrgente.value.mascotaId
      };

      this.citaService.crearUrgente(cita).subscribe({
        next: () => this.mensaje = 'Cita urgente creada correctamente.',
        error: () => this.mensaje = 'Error al crear cita urgente.'
      });
    }
  }
}