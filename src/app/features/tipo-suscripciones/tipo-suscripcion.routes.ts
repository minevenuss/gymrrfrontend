import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";
// import { Roles } from "../../core/utils/enum-roles.utils";

//solo el admin y el empleado podran entrar 

export const TSUSCRIPCION_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/tipo-suscripcion-list-page/tipo-suscripcion-list-page.component').then(m=> m.TipoSuscripcionListPageComponent),
        // canActivate: [roleGuard(['Admin', 'Empleado'])],
        title: 'Tipo Suscripcion - GymRR'
    }
];