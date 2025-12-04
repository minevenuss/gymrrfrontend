import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargo-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cargo-modal.component.html',
  styleUrl: './cargo-modal.component.css',
})
export class CargoModalComponent {
    @Input() cargo:any =null;
    @Input() isEdit=false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        Nombre: ['', Validators.required],
        Descripcion: ['', Validators.required]
    });

    ngOnChanges() {
        if(this.cargo && this.isEdit){
            this.form.patchValue({
                ...this.cargo,
                fecha: this.cargo.fecha
                ? new Date(this.cargo.fecha).toISOString().substring(0,10) : ''
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
