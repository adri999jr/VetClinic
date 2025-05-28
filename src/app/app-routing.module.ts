import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterClienteComponent } from './pages/register-cliente/register-cliente.component';
import { RegisterVeterinarioComponent } from './pages/register-veterinario/register-veterinario.component';
import { HomeComponent } from './home/home.component';
import { LoginSelectorComponent } from './login/login-selector/login-selector.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { LoginVeterinarioComponent } from './login/login-veterinario/login-veterinario.component';
import { HomeVeterinarioComponent } from './home-veterinario/home-veterinario.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ValidarVeterinarioComponent } from './validar-veterinario/validar-veterinario.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: 'register/cliente', component: RegisterClienteComponent },
  { path: 'register/veterinario', component: RegisterVeterinarioComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginSelectorComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
  { path: 'login/veterinario', component: LoginVeterinarioComponent },

  {
    path: 'home/cliente',
    component: HomeClienteComponent,
    canActivate: [RoleGuard],
    data: { roles: ['CLIENTE'] }
  },
  {
    path: 'home/veterinario',
    component: HomeVeterinarioComponent,
    canActivate: [RoleGuard],
    data: { roles: ['VETERINARIO'] }
  },
  {
    path: 'home/admin',
    component: HomeAdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'admin/validar/veterinario',
    component: ValidarVeterinarioComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
