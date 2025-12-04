import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";
// import { Roles } from "../../core/utils/enum-roles.utils";

//solo el admin y el empleado podran entrar 

export const INVENTARIO_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/inventario-list-page/inventario-list-page.component').then(m=> m.InventarioListPageComponent),
        canActivate: [roleGuard(['Admin', 'Empleado'])],
        title: 'Inventario - GymRR'
    }
];