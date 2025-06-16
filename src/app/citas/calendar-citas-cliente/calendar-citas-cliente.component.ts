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
})export class CalendarCitasClienteComponent implements OnInit {
  /* ─────────── estado original ─────────── */
  fechaActual: Date = new Date();         // mes/página visible
  citasDisponibles: { fecha: string; disponible: boolean }[] = [];
  citasPorDia: { [f: string]: { fecha: string; disponible: boolean }[] } = {};
  selectedDate: string | null = null;
  selectedHour: string | null = null;
  mascotas: any[] = [];
  formReserva: FormGroup;
  mensaje = '';

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

  /* ─────────── INICIALIZACIÓN ─────────── */


  /* ─────────── NAVEGACIÓN DE MESES ─────────── */
  /** Avanza un mes */
  mesSiguiente(): void {
    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() + 1,
      1
    );
    this.refrescarMes();
  }

  /** Retrocede un mes siempre que no sea anterior al actual */
  mesAnterior(): void {
    const hoy = new Date();                                  // mes actual real
    const esMesActual =
      this.fechaActual.getFullYear() === hoy.getFullYear() &&
      this.fechaActual.getMonth() === hoy.getMonth();

    if (esMesActual) return;                                 // bloquea retroceso

    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() - 1,
      1
    );
    this.refrescarMes();
  }

  /** Regenera slots y marca los ocupados */
  private refrescarMes(): void {
    this.generarCitasDisponiblesDelMes();
    this.cargarCitasOcupadasBackend();
    this.selectedDate = null;
    this.selectedHour = null;
  }

  /* ─────────── CARGA DESDE BACKEND PARA ESE MES ─────────── */
  private cargarCitasOcupadasBackend(): void {
    const y = this.fechaActual.getFullYear();
    const m = this.fechaActual.getMonth() + 1; // 1-based

    this.citaService.obtenerCitasDelMes(y, m).subscribe(citasRegistradas => {
      citasRegistradas.forEach(cr =>
        (this.citasDisponibles = this.citasDisponibles.map(s =>
          s.fecha === cr.fecha ? { ...s, disponible: false } : s
        ))
      );
      this.organizarCitasPorDia();
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
    this.generarCitasDisponiblesDelMes();
 this.mascotaService.getMascotasCliente().subscribe(data => {
  this.mascotas = data.map((m: any) => ({
    ...m,
    id_mascota: m.idMascota // mapea idMascota (camelCase del backend) a id_mascota para el formulario
  }));
});


    const year = this.fechaActual.getFullYear();
    const month = this.fechaActual.getMonth() + 1; // Ajusta el mes para la consulta
    this.citaService.obtenerCitasDelMes(year, month).subscribe((citasRegistradas) => {
      // Recorremos cada cita registrada y actualizamos el array de slots
      citasRegistradas.forEach((citaRegistrada) => {
        this.citasDisponibles = this.citasDisponibles.map(slot =>
          slot.fecha === citaRegistrada.fecha ? { ...slot, disponible: false } : slot
        );
      });
      this.organizarCitasPorDia();
      this.cd.detectChanges();
    });
  }

  // Función para formatear la fecha en formato ISO conservando la hora local
  // Ejemplo: "2025-06-15T19:00:00"
  private formatLocalDateTime(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

  // Genera todos los slots del mes actual y marca como no disponibles:
  // - aquellos que ya han pasado (según hora y también, para la visualización, se deshabilitará el día completo)
  generarCitasDisponiblesDelMes(): void {
    const year = this.fechaActual.getFullYear();
    const month = this.fechaActual.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const citas: { fecha: string; disponible: boolean }[] = [];
    const ahora = new Date();

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0) { // Excluye domingos
        const morningHours = [9, 10, 11, 12, 13];
        morningHours.forEach(hour => {
          [0, 30].forEach(minute => {
            const fechaSlot = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
            const disponible = fechaSlot >= ahora;
            citas.push({ fecha: this.formatLocalDateTime(fechaSlot), disponible });
          });
        });
        const afternoonHours = [16, 17, 18, 19];
        afternoonHours.forEach(hour => {
          [0, 30].forEach(minute => {
            const fechaSlot = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute);
            const disponible = fechaSlot >= ahora;
            citas.push({ fecha: this.formatLocalDateTime(fechaSlot), disponible });
          });
        });
      }
    }
    this.citasDisponibles = citas;
    this.organizarCitasPorDia();
  }

  // Organiza los slots en un objeto agrupado por día (clave = "YYYY-MM-DD")
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

  // Devuelve true si todos los slots de un día están ocupados
  esDiaOcupado(citasDia: { fecha: string; disponible: boolean }[]): boolean {
    return citasDia.every(cita => !cita.disponible);
  }

  // Devuelve true si el día (en formato "YYYY-MM-DD") ya pasó (sin considerar la hora)
  isDiaPasado(dia: string): boolean {
    // Creamos un objeto Date a las 00:00 del día indicado
    const diaDate = new Date(dia + 'T00:00:00');
    const hoy = new Date();
    const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return diaDate < hoySinHora;
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

  // Marca un slot como no disponible de forma inmutable
  private marcarCitaComoOcupada(fecha: string): void {
    this.citasDisponibles = this.citasDisponibles.map(cita =>
      cita.fecha === fecha ? { ...cita, disponible: false } : cita
    );
    this.organizarCitasPorDia();
    this.cd.detectChanges();
    console.log('Citas actualizadas:', this.citasDisponibles.filter(c => c.fecha === fecha));
  }
}
