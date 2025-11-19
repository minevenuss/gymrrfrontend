import { provideRouter, withComponentInputBinding } from "@angular/router";
import {APP_ROUTES} from '../config/routes.config';

export const routerProvider = [
    provideRouter(
        APP_ROUTES,
        withComponentInputBinding()
    )
];