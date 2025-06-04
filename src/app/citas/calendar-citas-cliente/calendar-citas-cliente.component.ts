import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.formReserva = this.fb.group({
      fecha: [''],
      motivo: [''],
      mascotaId: [''],
      tipoCita: ['']
    });
  }
ngOnInit(): void {
  this.generarCitasDisponiblesDelMes();
  this.mascotaService.getMascotasCliente().subscribe(data => {
    this.mascotas = data;
  });
  
  const year = this.fechaActual.getFullYear();
  const month = this.fechaActual.getMonth() + 1; // Asegúrate del formato que esperas
  this.citaService.obtenerCitasDelMes(year, month).subscribe((citasRegistradas) => {
    // Supongamos que cada cita tiene una propiedad 'fecha' en formato ISO (por ejemplo "2025-06-15T19:00:00")
    citasRegistradas.forEach((citaRegistrada) => {
      // Actualizamos el array de slots marcándolos como no disponibles si la fecha coincide.
      this.citasDisponibles = this.citasDisponibles.map(slot =>
        slot.fecha === citaRegistrada.fecha ? { ...slot, disponible: false } : slot
      );
    });
    this.organizarCitasPorDia();
    // Opcional: forzar la detección de cambios si fuera necesario
    this.cd.detectChanges();
  });
}


  // Función para formatear la fecha en formato ISO conservando la hora local,
  // por ejemplo: "2025-06-15T19:00:00"
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
      if (d.getDay() !== 0) {  // Excluye domingos
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
    const nuevoMap: { [fecha: string]: { fecha: string; disponible: boolean }[] } = {};
    this.citasDisponibles.forEach(cita => {
      const fechaKey = cita.fecha.split('T')[0];
      if (!nuevoMap[fechaKey]) {
        nuevoMap[fechaKey] = [];
      }
      nuevoMap[fechaKey].push(cita);
    });
    this.citasPorDia = nuevoMap;
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
        tipoCita: this.formReserva.value.tipoCita
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
    // Actualizamos los slots de manera inmutable
    this.citasDisponibles = this.citasDisponibles.map(cita =>
      cita.fecha === fecha ? { ...cita, disponible: false } : cita
    );
    this.organizarCitasPorDia();
    // Forzamos la detección de cambios para que Angular actualice la vista
    this.cd.detectChanges();
    console.log('Citas actualizadas:', this.citasDisponibles.filter(c => c.fecha === fecha));
  }
}
