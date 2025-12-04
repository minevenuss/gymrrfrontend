import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Suscripcion } from '../../../../core/interfaces/suscripcion.interface';

@Component({
  selector: 'app-suscripciones-table',
  imports: [CommonModule],
  templateUrl: './suscripciones-table.component.html',
  styleUrl: './suscripciones-table.component.css',
})
export class SuscripcionesTableComponent {
    @Input() suscripcion: Suscripcion[] = []; //recibe la lista de actividades desde afueraaa
    @Output() edit = new EventEmitter<Suscripcion>(); //el event emitter como su nombre lo dice emite cuando se quiere editar una actividad
    @Output() delete = new EventEmitter<number>(); //este emite el id cuando quieren borrar

    onEdit(item: Suscripcion){
        this.edit.emit(item)
    }
    onDelete(id: number) {
        this.delete.emit(id);
    }
    getEstadoBadge(estado: Suscripcion['estado']): string {
            switch (estado) {
                case 'Activa':     return 'bg-success';
                case 'Inactiva':  return 'bg-warning text-dark';
                case 'Cancelada':  return 'bg-danger';
                default:           return 'bg-secondary';
    }
  }
}
