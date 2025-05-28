import { Component } from '@angular/core';
import { VeterinarioService } from '../../service/veterinario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-veterinario',
  standalone: false,
  templateUrl: './login-veterinario.component.html',
  styleUrl: './login-veterinario.component.css'
})
export class LoginVeterinarioComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.veterinarioService.loginVeterinario(username, password).subscribe({
        next: (res) => {
          // Redirigir según el rol
          if (res.role === 'ADMIN') {
            this.router.navigate(['/home/admin']);
          } else if (res.role === 'VETERINARIO') {
            this.router.navigate(['/home/veterinario']);
          } else {
            this.errorMessage = 'Rol desconocido.';
          }
        },
        error: (err) => {
          this.errorMessage = err.error || 'Usuario, contraseña incorrectos o cuenta no validada.';
        }
      });
    }
  }
}
