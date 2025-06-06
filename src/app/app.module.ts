import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Importar AppRoutingModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { JwtInterceptor } from './jwt.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginSelectorComponent } from './login/login-selector/login-selector.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';
import { LoginVeterinarioComponent } from './login/login-veterinario/login-veterinario.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { HomeVeterinarioComponent } from './home-veterinario/home-veterinario.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ValidarVeterinarioComponent } from './validar-veterinario/validar-veterinario.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfilVeterinarioComponent } from './perfiles/perfil-veterinario/perfil-veterinario.component';
import { GestionMascotasHomeComponent } from './gestion-mascotas-home/gestion-mascotas-home.component';
import { CrearMascotaComponent } from './crear-mascota/crear-mascota.component';
import { ConsultarMascotasComponent } from './consultar-mascota/consultar-mascota.component';
import { ConsultarMisMascotasComponent } from './consultar-mis-mascotas/consultar-mis-mascotas.component';
import { CalendarCitasClienteComponent } from './citas/calendar-citas-cliente/calendar-citas-cliente.component';
import { MisCitasClienteComponent } from './citas/mis-citas-cliente/mis-citas-cliente.component';
import { CrearCitaUrgenteComponent } from './citas/crear-cita-urgente/crear-cita-urgente.component';
import { VerCitasVeterinarioComponent } from './citas/ver-citas-veterinario/ver-citas-veterinario.component';
import { LOCALE_ID } from '@angular/core';


import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PerfilClienteComponent } from './perfiles/perfil-cliente/perfil-cliente.component';

// Registra el locale español
registerLocaleData(localeEs, 'es-ES');



// No es necesario declarar los componentes standalone aquí
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginSelectorComponent,
    LoginClienteComponent,
    LoginVeterinarioComponent,
    HomeClienteComponent,
    HomeVeterinarioComponent,
    HomeAdminComponent,
    ValidarVeterinarioComponent,
    PerfilVeterinarioComponent,
    GestionMascotasHomeComponent,
    CrearMascotaComponent,
    ConsultarMascotasComponent,
    ConsultarMisMascotasComponent,
    CalendarCitasClienteComponent,
    MisCitasClienteComponent,
    CrearCitaUrgenteComponent,
    VerCitasVeterinarioComponent,
    PerfilClienteComponent
   
    // Ya no se declaran aquí RegisterClienteComponent ni RegisterVeterinarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule, // Asegúrate de tener importado AppRoutingModule para las rutas
    HttpClientModule,
  ],
  providers: [
    {  provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
