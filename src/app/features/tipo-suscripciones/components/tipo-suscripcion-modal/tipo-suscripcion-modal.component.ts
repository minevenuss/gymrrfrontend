import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";

@Component({
    selector: 'app-tipo-suscripcion-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './tipo-suscripcion-modal.component.html',
    styleUrls: ['./tipo-suscripcion-modal.component.css']
})
export class TipoSuscripcionModalComponent {

    @Input() suscripcion: any = null;
    @Input() isEdit = false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        Nombre: ['', Validators.required],
        Descripcion: [''],
        Precio: [0, [Validators.required, Validators.min(1)]],
        Duracion: ['', Validators.required] // Puede ser "30 días", "1 mes", "365 días", etc.
    });

    ngOnChanges() {
        if (this.suscripcion && this.isEdit) {
        this.form.patchValue({
            Nombre: this.suscripcion.NombreTipSus, 
            Descripcion: this.suscripcion.Descripcion || '',
            Precio: this.suscripcion.Precio,
            Duracion: this.suscripcion.Duracion
        });
        }
  }

    isInvalid(control: string) {
        const c = this.form.get(control);
        return c?.invalid && (c?.dirty || c?.touched);
    }

    onSubmit() {
        if (this.form.valid) {
            this.save.emit(this.form.getRawValue());
        }
    }
}
