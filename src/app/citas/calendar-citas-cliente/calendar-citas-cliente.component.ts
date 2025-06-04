import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CitaService } from '../../service/citaService';
import { MascotaService } from '../../service/mascota.service';

@Component({
  selector: 'app-calendar-citas-cliente',
  templateUrl: './calendar-citas-cliente.component.html',
  styleUrls: ['./calendar-citas-cliente.component.css'],
  standalone: false
})
export class CalendarCitasClienteComponent implements OnInit {
  citasDisponibles: { fecha: string; disponible: boolean }[] = [];
  citasPorDia: { [fecha: string]: { fecha: string; disponible: boolean }[] } = {};

  selectedDate: string | null = null;
  selectedHour: string | null = null;

  mascotas: any[] = [];
  formReserva: FormGroup;
  mensaje: string = '';
  fechaActual: Date = new Date();

  constructor(
    private citaService: CitaService,
    private authService: AuthService,
    private mascotaService: MascotaService,
    private fb: FormBuilder
  ) {
    // Se añade el campo 'tipoCita' al formulario
    this.formReserva = this.fb.group({
      fecha: [''],
      motivo: [''],
      mascotaId: [''],
      tipoCita: [''] // Nuevo campo para el tipo (presencial o telefonica)
    });
  }

  ngOnInit(): void {
    this.generarCitasDisponiblesDelMes();
    this.mascotaService.getMascotasCliente().subscribe(data => {
      this.mascotas = data;
    });
  }

  // Función para formatear la fecha y conservar la hora local
  private formatLocalDateTime(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

  generarCitasDisponiblesDelMes(): void {
    const year = this.fechaActual.getFullYear();
    const month = this.fechaActual.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const citas: { fecha: string; disponible: boolean }[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0) {
        const morningHours = [9, 10, 11, 12, 13];
        morningHours.forEach(hour => {
          [0, 30].forEach(minute => {
            const fechaSlot = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
            citas.push({ fecha: this.formatLocalDateTime(fechaSlot), disponible: true });
          });
        });
        const afternoonHours = [16, 17, 18, 19];
        afternoonHours.forEach(hour => {
          [0, 30].forEach(minute => {
            const fechaSlot = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
            citas.push({ fecha: this.formatLocalDateTime(fechaSlot), disponible: true });
          });
        });
      }
    }
    this.citasDisponibles = citas;
    this.organizarCitasPorDia();
  }

  organizarCitasPorDia(): void {
    this.citasPorDia = {};
    this.citasDisponibles.forEach(cita => {
      const fechaKey = cita.fecha.split('T')[0];
      if (!this.citasPorDia[fechaKey]) {
        this.citasPorDia[fechaKey] = [];
      }
      this.citasPorDia[fechaKey].push(cita);
    });
  }

  esDiaOcupado(citasDia: { fecha: string; disponible: boolean }[]): boolean {
    return citasDia.every(cita => !cita.disponible);
  }

  seleccionarFecha(fecha: string): void {
    this.selectedDate = fecha;
    this.selectedHour = null;
  }

  seleccionarHora(fecha: string): void {
    this.selectedHour = fecha;
    this.formReserva.patchValue({ fecha: fecha });
  }

  reservar(): void {
    if (this.formReserva.valid && this.selectedHour) {
      const cita = {
        fecha: this.formReserva.value.fecha,
        motivo: this.formReserva.value.motivo,
        mascotaId: this.formReserva.value.mascotaId,
        tipoCita: this.formReserva.value.tipoCita  // Enviamos el tipo de cita seleccionado
      };

      this.citaService.reservarCita(cita).subscribe({
        next: () => {
          this.mensaje = 'Cita reservada correctamente.';
          this.marcarCitaComoOcupada(this.selectedHour!);
          this.selectedHour = null;
          this.selectedDate = null;
          this.formReserva.reset();
        },
        error: () => this.mensaje = 'Error al reservar la cita.'
      });
    }
  }

  private marcarCitaComoOcupada(fecha: string): void {
    const cita = this.citasDisponibles.find(c => c.fecha === fecha);
    if (cita) {
      cita.disponible = false;
    }
    this.organizarCitasPorDia();
  }
}
