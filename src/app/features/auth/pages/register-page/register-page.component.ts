import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component ({
    selector: 'app-register-page',
    standalone: true,
    imports: [RegisterFormComponent],
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent{
    readonly auth = inject(AuthService);

    onSubmit(data: {primerNombre: string; primerApellido: string; email:string; password:string; userName: string;}){
        this.auth.register(data);
    }
}