import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";


@Component ({
    selector: 'app-actividad-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './actividad-modal.component.html',
    styleUrls: ['./actividad-modal.component.css']
})

export class ActividadModalComponent {
    @Input() actividad:any =null;
    @Input() isEdit=false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion:['', Validators.required],
        fecha: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required],
        cupoMaximo: [1, [Validators.required, Validators.min(1)]],
        estado: ['Activa', Validators.required]
    });

    ngOnChanges() {
        if(this.actividad && this.isEdit){
            this.form.patchValue({
                ...this.actividad,
                fecha: this.actividad.fecha
                ? new Date(this.actividad.fecha).toISOString().substring(0,10) : ''
        });
            
        }
    }

    onSubmit() {
        if(this.form.valid) {
            this.save.emit(this.form.getRawValue());
        }
    }
}