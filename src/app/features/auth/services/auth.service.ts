import {inject, Injectable, signal, computed} from '@angular/core';
import { TokenStorageService } from '../../../core/utils/token-storage.service';
import { AuthApi } from '../api/auth.api';
import { User } from '../../../core/interfaces/user.interface';
import {Router} from '@angular/router';
import { NavigationService } from '../../../core/router/navigation.service';
import { Token } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class AuthService {
    private readonly api = inject(AuthApi)
    private readonly tokenStorage = inject(TokenStorageService)
    private readonly router = inject(Router)
    private readonly nav = inject(NavigationService)

    private user = signal<User| null>(this.tokenStorage.getUser());
    private isLoading = signal(false);

    user$ = this.user.asReadonly();
    isLoading$=this.isLoading.asReadonly();
    isLoggedIn=computed(() => !!this.user());

    login(credentials: {email: string; password: string}){
        this.isLoading.set(true);
        this.api.login(credentials).subscribe({
            next:(res) => {
                if (res.success && res.data){
                    this.tokenStorage.saveToken(res.data.token);
                    this.tokenStorage.saveUser(res.data.user);
                    this.user.set(res.data.user);
                    this.nav.goToDashboard();
                }
                this.isLoading.set(false);
            },
            error: () => this.isLoading.set(false)
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
}