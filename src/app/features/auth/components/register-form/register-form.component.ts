import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component ({
    selector: 'app-register-form',
    standalone:true,
    imports: [ReactiveFormsModule],
    template: `
    <form (ngSubmit)="submitRegister.emit(form.getRawValue())" [class.loading]="loading">
      <input formControlName="primerNombre" placeholder="Nombre" required />
      <input formControlName="primerApellido" placeholder="Apellido" required />
      <input formControlName="email" type="email" placeholder="Email" required />
      <input formControlName="password" type="password" placeholder="Contraseña" required />
      <input formControlName="userName" type="Usuario" placeholder="Usuario" required="">

      <button type="submit" [disabled]="loading">
        {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
      </button>
    </form>
  `

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