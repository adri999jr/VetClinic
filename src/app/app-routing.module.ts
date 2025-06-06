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
import { PerfilVeterinarioComponent } from './perfiles/perfil-veterinario/perfil-veterinario.component';
import { GestionMascotasHomeComponent } from './gestion-mascotas-home/gestion-mascotas-home.component';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { ConsultarMascotasComponent } from './consultar-mascota/consultar-mascota.component';
import { ConsultarMisMascotasComponent } from './consultar-mis-mascotas/consultar-mis-mascotas.component';
import { CalendarCitasClienteComponent } from './citas/calendar-citas-cliente/calendar-citas-cliente.component';
import { CrearCitaUrgenteComponent } from './citas/crear-cita-urgente/crear-cita-urgente.component';
import { PerfilClienteComponent } from './perfiles/perfil-cliente/perfil-cliente.component';
import { VerCitasVeterinarioComponent } from './citas/ver-citas-veterinario/ver-citas-veterinario.component';
const routes: Routes = [
  { path: 'register/cliente', component: RegisterClienteComponent },
  { path: 'register/veterinario', component: RegisterVeterinarioComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginSelectorComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
  { path: 'login/veterinario', component: LoginVeterinarioComponent },
  {path: 'perfil/veterinario', component:PerfilVeterinarioComponent},
  {path: 'gestion/mascotas/home', component:GestionMascotasHomeComponent},
  {path: 'crear/mascota', component:CrearMascotaComponent},
  {path: 'consultar/mascotas', component:ConsultarMascotasComponent},
  {path: 'perfil/mascotas', component:ConsultarMisMascotasComponent},
  {path: 'perfil/cliente', component:PerfilClienteComponent},
  {path: 'calendario/citas',component:CalendarCitasClienteComponent},
  {path: 'mascotas/buscar', component:VerCitasVeterinarioComponent},

  {path: 'citas/urgente', component:CrearCitaUrgenteComponent},

  {path: 'mascotas/buscar', component:VerCitasVeterinarioComponent,canActivate: [RoleGuard],
    data: { roles: ['CLIENTE'] }},
   {
    path: 'perfil/cliente',
    component:PerfilClienteComponent,
    canActivate: [RoleGuard],
    data: { roles: ['CLIENTE'] }
  },

  {
    path: 'perfil/Mascotas',
    component: ConsultarMisMascotasComponent,
    canActivate: [RoleGuard],
    data: { roles: ['CLIENTE'] }
  },
     {
    path: 'consultar/mascotas',
    component: ConsultarMascotasComponent,
    canActivate: [RoleGuard],
    data: { roles: ['VETERINARIO'] }
  },
   {
    path: 'crear/mascota',
    component: CrearMascotaComponent,
    canActivate: [RoleGuard],
    data: { roles: ['VETERINARIO'] }
  },
  
    {
    path: 'gestion/mascotas/home',
    component: GestionMascotasHomeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['VETERINARIO'] }
  },
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
