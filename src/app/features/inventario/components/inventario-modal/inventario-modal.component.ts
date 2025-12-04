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
        Nombre: ['', Validators.required],
        Categoria: ['', Validators.required],
        Cantidad: [1, [Validators.required, Validators.min(1)]],
        Estado: ['Nuevo', Validators.required],
        Descripcion: ['']
    });

    ngOnChanges() {
    if (this.inventario && this.isEdit) {
      this.form.patchValue({
        Nombre: this.inventario.Nombre || this.inventario.nombre || '',
        Categoria: this.inventario.Categoria || this.inventario.categoria || '',
        Cantidad: this.inventario.Cantidad || this.inventario.cantidad || 1,
        Estado: this.inventario.Estado || this.inventario.estado || 'Nuevo',
        Descripcion: this.inventario.Descripcion || this.inventario.descripcion || ''
      });
    }
  }

    onSubmit() {
        if (this.form.valid) {
        this.save.emit(this.form.getRawValue());
        }
    }
}