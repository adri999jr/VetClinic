import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Importar AppRoutingModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';
import { HomeComponent } from './home/home.component';
import { LoginSelectorComponent } from './login/login-selector/login-selector.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';
import { LoginVeterinarioComponent } from './login/login-veterinario/login-veterinario.component';


// No es necesario declarar los componentes standalone aquí
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    VeterinariosComponent,
    HomeComponent,
    LoginSelectorComponent,
    LoginClienteComponent,
    LoginVeterinarioComponent,
   
    // Ya no se declaran aquí RegisterClienteComponent ni RegisterVeterinarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule, // Asegúrate de tener importado AppRoutingModule para las rutas
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
