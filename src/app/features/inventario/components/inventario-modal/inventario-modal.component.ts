import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";


@Component ({
    selector: 'app-inventario-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './inventario-modal.component.html',
    styleUrls: ['./inventario-modal.component.css']
})

export class InventarioModalComponent {
    @Input() inventario:any =null;
    @Input() isEdit = false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        nombre: ['', Validators.required],
        categoria: ['', Validators.required],
        cantidad: [1, [Validators.required, Validators.min(1)]],
        estado: ['Nuevo', Validators.required],
        descripcion: [''],
        fechaRegistro: [null],
        fechaActualizacion: [null],
    });

    ngOnChanges() {
        if (this.inventario && this.isEdit) {
        this.form.patchValue(this.inventario);
        }
    }

    onSubmit() {
        if (this.form.valid) {
        this.save.emit(this.form.getRawValue());
        }
    }
}