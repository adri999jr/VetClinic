import { Component, OnInit } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../models/cliente.model';

interface JwtPayload {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-perfil-cliente',
  standalone: false,
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  cliente: Cliente | null = null;
  error: string | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const username = decoded.sub;
        this.clienteService.getClientePorUsername(username).subscribe({
          next: (cliente) => this.cliente = cliente,
          error: () => this.error = 'No se pudo cargar el perfil.'
        });
      } catch (e) {
        this.error = 'Token inválido.';
      }
    } else {
      this.error = 'No hay token de autenticación.';
    }
  }
}
