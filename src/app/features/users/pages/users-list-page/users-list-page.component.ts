import { Component, inject, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { UsersTableComponent } from "../../components/users-table/users-table.component";

@Component ({
    selector: 'app-users-list-page',
    standalone: true,
    imports: [UsersTableComponent], //aqui estamos trayendo la tabla que creamos en la seccion de componentes, esto es reutilizable
    template: `
    <h2>Lista de Usuarios</h2>
    <button (click)="service.loadAll()">Recargar</button>

    <app-users-table
      [users]="service.users$()"
      (delete)="service.delete($event)"
    />
  `
})
export class UsersLIstPageComponent implements OnInit{
    readonly service = inject(UsersService); //aqui inyectamos el servicio de users

    ngOnInit(){
        this.service.loadAll(); //esto carga los usuarios al entrar a la pag
    }
}