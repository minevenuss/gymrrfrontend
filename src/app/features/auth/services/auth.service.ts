import {inject, Injectable, signal, computed} from '@angular/core';
import { TokenStorageService } from '../../../core/utils/token-storage.service';
import { AuthApi } from '../api/auth.api';
import { User } from '../../../core/interfaces/user.interface';
import { NavigationService } from '../../../core/router/navigation.service';
import { RegisterDto } from '../types/register.dto';
import { LoginDto } from '../types/login.dto';


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

    login(credentials: LoginDto){
        this.isLoading.set(true);
        this.api.login(credentials).subscribe({
            next:(res) => {
                if (res.success && res.data){
                    this.setAuthData(res.data);
                    this.nav.goToDashboard();
                }
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false)
        });
    }
    
    register(data: RegisterDto){
        this.isLoading.set(true);
        this.api.register(data).subscribe({
            next: (res) => {
                if (res.success && res.data){
                    this.setAuthData(res.data);
                    this.nav.goToDashboard();

                }
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false),
        })
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
