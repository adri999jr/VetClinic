import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterClienteComponent } from './pages/register-cliente/register-cliente.component';
import { RegisterVeterinarioComponent } from './pages/register-veterinario/register-veterinario.component';
import { HomeComponent } from './home/home.component';
import { LoginSelectorComponent } from './login/login-selector/login-selector.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';

const routes: Routes = [
  { path: 'register/cliente', component: RegisterClienteComponent },
  { path: 'register/veterinario', component: RegisterVeterinarioComponent },
  { path: '', component: HomeComponent },
  {path: 'login', component: LoginSelectorComponent},
  {path: 'clientes/login',component: LoginClienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
