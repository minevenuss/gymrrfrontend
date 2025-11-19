import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {LoginFormComponent} from '../../components/login-form/login-form.component'

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent],
    template: `
    <div class="login-page">
      <h2>Bienvenido a GymRR</h2>
      
      <app-login-form
        [loading]="auth.isLoading$()"
        (submitLogin)="onSubmit($event)"
      />
    </div>
  `,
  styles: [`
    .login-page { 
      max-width: 400px; 
      margin: 0 auto; 
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class LoginPageComponent {
    private readonly fb = inject(FormBuilder);
    readonly auth = inject(AuthService);

    onSubmit(credentials:{email:string;password:string}){
        this.auth.login(credentials);
    }
}