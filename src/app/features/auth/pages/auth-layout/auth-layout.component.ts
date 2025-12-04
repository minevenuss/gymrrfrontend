import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../../../shared/components/footer/footer";
import { Navbar } from "../../../../shared/components/navbar/navbar";

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent {


}
