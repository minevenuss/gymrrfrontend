import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TokenStorage} from '../utils/token-storage.service';

export const guestGuard: CanActivateFn = () => {
    const tokenService = inject(TokenStorage);
    const router = inject(Router);
    const token = tokenService.getToken();
    if (token) {
        router.navigate(['/dashboard']);
        return false;
    }
    return true;
}