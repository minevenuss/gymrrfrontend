import { InjectionToken } from "@angular/core";

export const ROUTE_PREFIXES = new InjectionToken('ROUTE_PREFIXES',{
    providedIn: 'root',
    factory: () => ({
        AUTH: '/auth',
        DASHBOARD: '/dashboard',
        USERS: '/users',
        CARGOS: '/cargos',
        TIPOS_SUSCRIPCION: '/tipos-suscripcion',
        SUSCRIPCIONES: '/suscripciones',
})
});

