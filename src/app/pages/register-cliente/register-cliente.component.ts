import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.css']
})
export class RegisterClienteComponent {
  form: FormGroup;
  mensaje: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.maxLength(9)]],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.mensaje = null;
      this.error = this.getValidationErrors();
      return;
    }

    const cliente = this.form.value;

    this.authService.registerCliente(cliente).subscribe({
      next: () => {
        this.mensaje = 'Cliente registrado con éxito.';
        this.error = null;
        this.form.reset();
        // Opcional: Redirigir tras unos segundos
        // setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = 'Error al registrar el cliente. Puede que el usuario ya exista.';
        this.mensaje = null;
      }
    });
  }

  private getValidationErrors(): string {
    if (this.form.get('dni')?.hasError('maxlength')) {
      return 'El DNI no puede tener más de 9 caracteres.';
    }
    if (this.form.get('email')?.hasError('email')) {
      return 'El correo electrónico no es válido.';
    }
    if (this.form.get('dni')?.hasError('required') ||
        this.form.get('nombre')?.hasError('required') ||
        this.form.get('email')?.hasError('required') ||
        this.form.get('username')?.hasError('required') ||
        this.form.get('password')?.hasError('required')) {
      return 'Por favor, completa todos los campos obligatorios.';
    }

    return 'Hay errores en el formulario. Revisa los campos.';
  }
}
