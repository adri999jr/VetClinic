import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-cliente',
  standalone: false,
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {
  username: string = '';

  ngOnInit(): void {
    const data = localStorage.getItem('clienteData');
    if (data) {
      const parsed = JSON.parse(data);
      this.username = parsed.username;
    }
  }
}
