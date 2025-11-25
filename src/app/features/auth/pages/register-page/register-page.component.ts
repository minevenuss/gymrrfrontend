import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component ({
    selector: 'app-register-page',
    standalone: true,
    imports: [RegisterFormComponent],
    template: `
    <div class="register-page">
      <h2>Crear cuenta en GymRR</h2>
      
      <app-register-form
        [loading]="auth.isLoading$()"
        (submitRegister)="onSubmit($event)"
      />
      
      <p class="login-link">
        ¿Ya tienes cuenta? <a routerLink="../login">Iniciar sesión</a>
      </p>
    </div>
  `,
  styles: [`
    .register-page { text-align: center; padding: 2rem; }
    .login-link { margin-top: 1rem; }
    a { color: #667eea; text-decoration: underline; }
  `]
})
export class RegisterPageComponent{
    readonly auth = inject(AuthService);

    onSubmit(data: {primerNombre: string; primerApellido: string; email:string; password:string; userName: string;}){
        this.auth.register(data);
    }
}