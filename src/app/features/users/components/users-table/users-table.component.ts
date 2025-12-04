import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../../../core/interfaces/user.interface";
import { CommonModule } from "@angular/common";

@Component ({
    selector: 'app-users-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
    @Input() users: User[] = []; //recibe la lista de usuarios desde afueraaa
    @Output() edit = new EventEmitter<User>(); //el event emitter como su nombre lo dice emite cuando se quiere editar un usuario
    @Output() delete = new EventEmitter<string>(); //este emite el id cuando quieren borrar
   
    onEdit(item: User){
           this.edit.emit(item)
       }
       onDelete(id: string) {
           this.delete.emit(id);
       }
    getRoleBadge(rol: string): string {
  switch (rol) {
    case 'Admin':    return 'bg-danger';
    case 'Empleado': return 'bg-warning text-dark';
    case 'Cliente':  return 'bg-success';
    default:         return 'bg-secondary';
  }
}
}