import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VeterinarioService } from '../../service/veterinario.service';

@Component({
  selector: 'app-register-veterinario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-veterinario.component.html',
  styleUrls: ['./register-veterinario.component.css']
})
export class RegisterVeterinarioComponent {
  form: FormGroup;
  mensaje: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
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

    const veterinario = this.form.value;
    this.veterinarioService.registerVeterinario(veterinario).subscribe({
      next: () => {
        this.mensaje = 'Veterinario registrado con éxito.';
        this.error = null;
        this.form.reset();
        // Opcional: Redirigir tras unos segundos
        // setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = 'Error al registrar el veterinario. Puede que el usuario ya exista.';
        this.mensaje = null;
      }
    });
  }

  private getValidationErrors(): string {
    if (this.form.get('email')?.hasError('email')) {
      return 'El correo electrónico no es válido.';
    }
    if (this.form.get('nombre')?.hasError('required') ||
        this.form.get('especialidad')?.hasError('required') ||
        this.form.get('email')?.hasError('required') ||
        this.form.get('username')?.hasError('required') ||
        this.form.get('password')?.hasError('required')) {
      return 'Por favor, completa todos los campos obligatorios.';
    }

    return 'Hay errores en el formulario. Revisa los campos.';
  }
}
