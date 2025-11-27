import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css'],
})

export class LoginFormComponent {
    private readonly fb = inject(FormBuilder)
    @Input() loading = false;
    @Output() submitLogin = new EventEmitter<{email:string; password:string;}>();

    readonly form = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}
