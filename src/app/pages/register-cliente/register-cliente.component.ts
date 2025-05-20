import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; // Importa FormBuilder y Validators
import { Router } from '@angular/router';
import { ClienteService } from '../../service/cliente.service';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- AÑADIR CommonModule
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.css']
})

export class RegisterClienteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const cliente = this.form.value;
    this.authService.registerCliente(cliente).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
