import {inject, Injectable, signal, computed} from '@angular/core';
import { TokenStorageService } from '../../../core/utils/token-storage.service';
import { AuthApi } from '../api/auth.api';
import { User } from '../../../core/interfaces/user.interface';
import { NavigationService } from '../../../core/router/navigation.service';
import { RegisterDto } from '../types/register.dto';
import { LoginDto } from '../types/login.dto';
import Swal from 'sweetalert2';
@Injectable({providedIn: 'root'})
export class AuthService {
    private readonly api = inject(AuthApi)
    private readonly tokenStorage = inject(TokenStorageService)
    //private readonly router = inject(Router)
    private readonly nav = inject(NavigationService)

    private user = signal<User| null>(this.tokenStorage.getUser());
    private isLoading = signal(false);

    readonly user$ = this.user.asReadonly();
    readonly isLoading$=this.isLoading.asReadonly();
    readonly isLoggedIn=computed(() => !!this.user());

    login(credentials: LoginDto) {
        this.isLoading.set(true);

        this.api.login(credentials).subscribe({
            next: (res) => {
                console.log("LOGIN RESPONSE:", res);
                
                if (!res) {
                    this.isLoading.set(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Respuesta vacía del servidor',
                        confirmButtonColor: '#DB2B39'
                    });
                    return;
                }
                
                if (res.success && res.data) {
                    this.setAuthData(res.data);

                    Swal.fire({
                        icon: 'success',
                        title: '¡Bienvenido de vuelta!',
                        text: `${res.data.user.primerNombre} ${res.data.user.primerApellido}`,
                        timer: 1800,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }).then(() => {
                        this.nav.goToDashboard();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login fallido',
                        text: 'Credenciales incorrectas',
                        confirmButtonColor: '#DB2B39'
                    });
                }
                
                this.isLoading.set(false);
            },
            error: (err) => {
                this.isLoading.set(false);

                let mensaje = 'Credenciales incorrectas';

                if (err.status === 401) {
                    if (err.error?.title?.includes('locked')) {
                        mensaje = 'Tu cuenta está bloqueada temporalmente';
                    } else if (err.error?.title?.includes('not allowed')) {
                        mensaje = 'Email no confirmado. Revisa tu correo';
                    } else {
                        mensaje = 'Email o contraseña incorrecta';
                    }
                } else if (err.status === 400) {
                    mensaje = err.error?.errores?.join('<br>') || 'Datos inválidos';
                } else {
                    mensaje = 'Error del servidor. Intenta más tarde';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo iniciar sesión',
                    html: `<strong>${mensaje}</strong>`,
                    confirmButtonColor: '#DB2B39',
                    timer: 4000,
                    timerProgressBar: true
                });
            }
        });
    }
    
    
   register(data: RegisterDto) {
    console.log('=== REGISTER DEBUG ===');
    console.log('Data enviada:', data);
    
    this.isLoading.set(true);
    this.api.register(data).subscribe({
        next: (res) => {
            console.log('Respuesta exitosa:', res);
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'Ya puedes iniciar sesión',
                confirmButtonColor: '#29335C'
            });
            this.isLoading.set(false);
        },
        error: (err) => {
            console.error('Error completo:', err);

           let erroresTexto = 'Error desconocido';

    if (err.error?.errores && Array.isArray(err.error.errores)) {
        erroresTexto = err.error.errores
            .map((e: any) => typeof e === 'string' ? e : JSON.stringify(e))
            .join('<br>');
    } else if (err.error?.mensaje) {
        erroresTexto = err.error.mensaje;
    } else if (err.message) {
        erroresTexto = err.message;
    }

    Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        html: erroresTexto,           // ← html (no text)
        confirmButtonColor: '#DB2B39'
    });

    this.isLoading.set(false);
}
    });
}
    
    logout(){
        this.tokenStorage.clear();
        this.user.set(null);
        this.nav.goToAuthLogin();
    }

   

    init(){
        const user = this.tokenStorage.getUser();
        if(user) this.user.set(user);
    }

    private setAuthData(data: {token:string; user: User}){
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
        this.user.set(data.user);
    }
}
