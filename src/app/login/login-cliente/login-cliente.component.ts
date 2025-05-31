import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cliente',
  standalone: false,
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.css'
})
export class LoginClienteComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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

      this.clienteService.loginCliente(username, password).subscribe({
        next: (res) => {
          console.log('Respuesta login backend:', res);

          if (res && res.token) {
            // Guardar el token en localStorage
            localStorage.setItem('token', res.token);

            // Redirigir al home del cliente
            this.router.navigate(['/home/cliente']);
          } else {
            this.errorMessage = 'Credenciales inválidas.';
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      });
    }
  }
}
