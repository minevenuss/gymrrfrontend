import {inject, InjectionToken, Provider} from '@angular/core';

import { AuthService } from '../../features/auth';

export const IS_AUTHENTICATED = new InjectionToken<boolean>('IS_AUTHENTICATED');

export const authProvider: Provider = {
        provide: IS_AUTHENTICATED,
        useFactory: () => {
            const authService = inject(AuthService);
            return authService.isLoggedIn();
        }
}
