import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import {LoginFormComponent} from '../../components/login-form/login-form.component'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [LoginFormComponent, ɵInternalFormsSharedModule, CommonModule],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
    // private readonly fb = inject(FormBuilder);
    readonly auth = inject(AuthService);

    onSubmit(credentials:{email:string;password:string}){
        this.auth.login(credentials);
    }
}