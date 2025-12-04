import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoSuscripcion } from "../../../../core/interfaces/tipo-suscripcion.interface";

@Component({
    selector: 'app-tipo-suscripcion-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tipo-suscripcion-table.component.html',
    styleUrls: ['./tipo-suscripcion-table.component.css']
})
export class TipoSuscripcionTableComponent {

    @Input() suscripciones: TipoSuscripcion[] = [];

     @Output() edit = new EventEmitter<TipoSuscripcion>();
    @Output() delete = new EventEmitter<number>();

    onEdit(item: TipoSuscripcion) {
        this.edit.emit(item);
    }

    onDelete(id: number) {
        this.delete.emit(id);
    }
}
