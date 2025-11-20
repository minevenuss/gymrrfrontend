import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TokenStorageService} from '../utils/token-storage.service';
import {Roles} from '../utils/enum-roles.utils';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
    return () => {
        const tokenService = inject(TokenStorageService);
        const router = inject(Router);
        const user = tokenService.getUser();
         if(!user) {
            router.navigate(['/auth/login']);
            return false;
        }

        if(!allowedRoles.includes(user.rol)) {
            router.navigate(['/dashboard']);
            return false;
        }
        return true;
         }
    }

