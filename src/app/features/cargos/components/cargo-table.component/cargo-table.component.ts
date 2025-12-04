import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cargos } from '../../../../core/interfaces/cargo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo-table',
  imports: [CommonModule],
  templateUrl: './cargo-table.component.html',
  styleUrl: './cargo-table.component.css',
})
export class CargoTableComponent {
    @Input() Cargo: Cargos[] = []; //recibe la lista de actividades desde afueraaa
    @Output() edit = new EventEmitter<Cargos>(); //el event emitter como su nombre lo dice emite cuando se quiere editar una actividad
    @Output() delete = new EventEmitter<number>(); //este emite el id cuando quieren borrar

    onEdit(item: Cargos){
        this.edit.emit(item)
    }
    onDelete(id: number) {
        this.delete.emit(id);
    }

}
