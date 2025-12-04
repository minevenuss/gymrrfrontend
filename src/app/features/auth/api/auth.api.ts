import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { API_CONFIG } from '../../../core/config/api.config';
import { LoginDto } from '../types/login.dto';
import { AuthResponse } from '../types/auth-response.interface';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';
import { RegisterDto } from '../types/register.dto';
@Injectable({ providedIn: 'root'})

export class AuthApi {
    private readonly http =inject(HttpClient);
    private readonly base = API_CONFIG.BASE_URL;

   login(credentials: LoginDto) {
    return this.http.post<ApiResponse<AuthResponse>>(
        `${this.base}${API_CONFIG.AUTH.LOGIN}?useCookies=false`,
        credentials
    );
}
    register(data: RegisterDto) {
        return this.http.post<ApiResponse<AuthResponse>>(
            this.base + API_CONFIG.AUTH.REGISTER,
            data
        );
    }
}
