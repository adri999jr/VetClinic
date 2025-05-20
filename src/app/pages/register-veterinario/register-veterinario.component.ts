import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; // Importa FormBuilder y Validators
import { Router } from '@angular/router';
import { VeterinarioService } from '../../service/veterinario.service';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

@Component({
  selector: 'app-register-veterinario',
  standalone: true, // Hacemos que el componente sea standalone
  imports: [ReactiveFormsModule], // Asegúrate de que ReactiveFormsModule esté importado aquí
  templateUrl: './register-veterinario.component.html',
  styleUrls: ['./register-veterinario.component.css']
})
export class RegisterVeterinarioComponent {
  form: FormGroup;

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
    if (this.form.invalid) return;

    const veterinario = this.form.value;
    this.veterinarioService.registerVeterinario(veterinario).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
