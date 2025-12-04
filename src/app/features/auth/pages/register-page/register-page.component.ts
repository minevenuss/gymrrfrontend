import {Component, inject} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { RouterLink } from '@angular/router';
@Component ({
    selector: 'app-register-page',
    standalone: true,
    imports: [RegisterFormComponent, RouterLink],
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent{
    readonly auth = inject(AuthService);

    onSubmit(data: any){
        console.log('=== DATA RECIBIDA EN PAGE ===');
        console.log('Data original:', data);
        console.log('Tipo:', typeof data);
        console.log('Keys:', Object.keys(data));

         const cleanData = {
            Email: data.Email,
            Password: data.Password,
            primerNombre: data.primerNombre,
            primerApellido: data.primerApellido
        };
        
        console.log('Data limpia:', cleanData);
        
        this.auth.register(cleanData);
    }
}