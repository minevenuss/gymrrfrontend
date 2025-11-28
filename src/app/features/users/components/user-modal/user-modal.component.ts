import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";


@Component ({
    selector: 'app-user-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.css']
})

export class UserModalComponent {
    @Input() user:any =null;
    @Input() isEdit=false;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        primerNombre: ['', Validators.required],
        primerApellido:['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        rol: ['Cliente', Validators.required]
    });

    ngOnChanges() {
        if(this.user && this.isEdit){
            this.form.patchValue(this.user);
            this.form.get('password')?.setValidators([]);
            this.form.get('password')?.updateValueAndValidity();
        }
    }

    onSubmit() {
        if(this.form.valid) {
            this.save.emit(this.form.getRawValue());
        }
    }
}