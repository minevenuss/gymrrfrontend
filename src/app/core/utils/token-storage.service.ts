
import { Injectable } from '@angular/core';
import {APP_CONFIG} from "../config/app.config";
import {User} from "../interfaces/user.interface";


@Injectable({  providedIn: 'root'})
export class TokenStorageService {
    private readonly TOKEN_KEY = APP_CONFIG.TOKEN_KEY;
    private readonly USER_KEY = 'gymrr_user';

    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    saveUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user)); 
     }

     getUser(): User | null {
        const data = localStorage.getItem(this.USER_KEY);
        return data ? JSON.parse(data) : null;
     }

     clear(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
     }
}




// export const TokenStorage = {
//     save: (token: string) => localStorage.setItem("token", token),
//     get: () => localStorage.getItem("token"),
//     clear: () => localStorage.removeItem("token"),
// }