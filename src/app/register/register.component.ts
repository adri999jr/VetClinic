import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { VeterinarioService } from '../service/veterinario.service';
import { Cliente } from '../models/cliente.model';
import { Veterinario } from '../models/veterinario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isVeterinario: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private veterinarioService: VeterinarioService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      especialidad: ['']
    });
  }

  toggleUserType() {
    this.isVeterinario = !this.isVeterinario;
  }

 onSubmit() {
  if (this.registerForm.invalid) {
    return;
  }

  const formValue = this.registerForm.value;

  // Llenar los valores predeterminados si faltan
  const cliente: Cliente = {
    id: 0,
    dni: '', // Si falta el DNI, puedes agregar lógica para pedirlo o generarlo.
    nombre: formValue.nombre,
    email: formValue.email,
    telefono: formValue.telefono || '', // Si no se proporciona, se asigna vacío
    direccion: formValue.direccion || '', // Asignar un valor vacío si no se proporciona
    username: formValue.username,
    password: formValue.password,
    role: 'CLIENTE', // Asignar el valor de 'role' como 'CLIENTE'
    mascotas: [], // Asumiendo que el campo es un array vacío inicialmente
  };

  const veterinario: Veterinario = {
    id: 0,
    nombre: formValue.nombre,
    especialidad: formValue.especialidad || '', // Especialidad puede estar vacío
    telefono: formValue.telefono || '',
    email: formValue.email,
    username: formValue.username,
    password: formValue.password,
    role: 'VETERINARIO', // Asegúrate de que 'role' esté asignado correctamente
    validado: false
  };

  if (this.isVeterinario) {
    this.veterinarioService.registerVeterinario(veterinario).subscribe({
      next: () => alert('Veterinario registrado correctamente'),
      error: (err) => alert('Error al registrar veterinario: ' + err.message),
    });
  } else {
    this.clienteService.registerCliente(cliente).subscribe({
      next: () => alert('Cliente registrado correctamente'),
      error: (err) => alert('Error al registrar cliente: ' + err.message),
    });
  }
}
}