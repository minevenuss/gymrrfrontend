import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './core/config/api.config';
import { Footer } from "./shared/components/footer/footer";
import { Navbar } from "./shared/components/navbar/navbar";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',

})
export class App //implements OnInit
{
  protected readonly title = signal('gymrrfrontend');

  constructor(private http:HttpClient) {}

  // ngOnInit(): void {
  //   this.http.get(`${API_CONFIG.BASE_URL}/Cuenta/ObtenerCuentas`).subscribe({
  //     next: (res) => console.log('Backend responde:', res),
  //     error: (err) => console.error('Error al conectar:', err)
  //   });
  // }
}
