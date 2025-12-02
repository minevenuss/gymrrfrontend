import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Actividades } from "../../../../core/interfaces/actividades.interface";
@Component ({
    selector: 'app-actividades-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './actividades-table.component.html',
    styleUrls: ['./actividades-table.component.css']
})
export class ActividadesTableComponent {
    @Input() actividad: Actividades[] = []; //recibe la lista de actividades desde afueraaa
    @Output() edit = new EventEmitter<Actividades>(); //el event emitter como su nombre lo dice emite cuando se quiere editar una actividad
    @Output() delete = new EventEmitter<number>(); //este emite el id cuando quieren borrar
   
    onEdit(item: Actividades){
        this.edit.emit(item)
    }
    onDelete(id: number) {
        this.delete.emit(id);
    }
    getEstadoBadge(estado: Actividades['estado']): string {
        switch (estado) {
            case 'Activa':     return 'bg-success';
            case 'Pendiente':  return 'bg-warning text-dark';
            case 'Cancelada':  return 'bg-danger';
            default:           return 'bg-secondary';
        }
}
}