import { Component } from '@angular/core';
import { Footer } from "../../../../shared/components/footer/footer";
import { Navbar } from "../../../../shared/components/navbar/navbar";

@Component({
  selector: 'app-home-page',
  imports: [Footer, Navbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  image = {
    url: '/src/app/assets/hombreymujertrabajandoenelgimnasioconmascarasmedicas.jpg'
  }
}
