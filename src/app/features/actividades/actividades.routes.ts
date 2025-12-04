import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";
// import { Roles } from "../../core/utils/enum-roles.utils";

//solo el admin y el empleado podran entrar

export const ACTIVIDADES_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/actividades-list-page/actividades-list-page.component').then(m=> m.ActividadesListPageComponent),
        //canActivate: [roleGuard(['Admin', 'Empleado'])],
        title: 'Actividades - GymRR'
    }
];
