import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component ({
    selector: 'app-register-form',
    standalone:true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css'],

})
export class RegisterFormComponent{
    private readonly fb = inject(FormBuilder);

    @Input() loading = false;
    @Output() submitRegister = new EventEmitter<{
        primerNombre:string;
        primerApellido:string;
        email:string;
        password:string;
        userName: string;
    }>();

    readonly form = this.fb.nonNullable.group({
        primerNombre: ['', Validators.required],
        primerApellido: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    })
}