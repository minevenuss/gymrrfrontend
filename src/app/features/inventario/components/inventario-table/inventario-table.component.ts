import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Inventario } from "../../../../core/interfaces/inventario.interface";

@Component ({
    selector: 'app-inventario-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inventario-table.component.html',
    styleUrls: ['./inventario-table.component.css']
})
export class InventarioTableComponent {
    @Input() inventarios: Inventario[] = []; //recibe la lista de usuarios desde afueraaa
    @Output() edit = new EventEmitter<Inventario>(); 
    @Output() delete = new EventEmitter<number>(); //este emite el id cuando quieren borrar
   
    onEdit(item: Inventario){
        this.edit.emit(item)
    }
    onDelete(id: number) {
        this.delete.emit(id);
    }
    getEstadoBadge(estado: string): string {
        switch (estado) {
            case 'Nuevo': return 'bg-success';
            case 'Usado': return 'bg-warning text-dark';
            default:      return 'bg-secondary';
        }
}
}