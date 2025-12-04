import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";
import { Suscripcion } from '../../../../core/interfaces/suscripcion.interface';


@Component({
  selector: 'app-suscripciones-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './suscripciones-modal.component.html',
  styleUrl: './suscripciones-modal.component.css',
})
export class SuscripcionesModalComponent {
    @Input() suscripcion:any =null;
    @Input() isEdit=false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        Estado: ['', Validators.required],
        FechaInicio:['', Validators.required],
        FechaFin: ['', Validators.required],
        EstadoPago: ['', Validators.required],
        UserID: [''],
        IdTipoSuscripcion: ['', Validators.required]
    });

    ngOnChanges() {
        if(this.suscripcion && this.isEdit){
            this.form.patchValue({
                ...this.suscripcion,
                fecha: this.suscripcion.fecha
                ? new Date(this.suscripcion.fecha).toISOString().substring(0,10) : ''
        });

        }
    }

    onSubmit() {
        console.log('Form válido?', this.form.valid);
    console.log('Form value:', this.form.getRawValue());
        if(this.form.valid) {
            this.save.emit(this.form.getRawValue());
        }
    }
}
