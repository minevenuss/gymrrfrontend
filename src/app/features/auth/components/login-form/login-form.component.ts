import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <form (ngSubmit)="submitLogin.emit(form.getRawValue())" [class.loading] ="loading">
            <input formControlName="email" type="email" placeholder="Email" required/>
            <input formControlName="password" type="password" placeholder="Contraseña" required />

            <button type= "submit" [disabled]="loading">
                {{loading ? 'Cargando...' : 'Iniciar Sesión'}}
            </button>
        </form>
    `

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