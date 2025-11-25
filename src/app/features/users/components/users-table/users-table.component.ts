import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../../../core/interfaces/user.interface";
import { CommonModule } from "@angular/common";

@Component ({
    selector: 'app-users-table',
    standalone: true,
    imports: [CommonModule],
    template: `
    <table>
      <thead>
        <tr>
          <th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.primerNombre }} {{ user.primerApellido }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.rol }}</td>
          <td>
            <button (click)="edit.emit(user)">Editar</button>
            <button (click)="delete.emit(user.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class UsersTableComponent {
    @Input() users: User[] = []; //recibe la lista de usuarios desde afueraaa
    @Output() edit = new EventEmitter<User>(); //el event emitter como su nombre lo dice emite cuando se quiere editar un usuario
    @Output() delete = new EventEmitter<number>(); //este emite el id cuando quieren borrar
}