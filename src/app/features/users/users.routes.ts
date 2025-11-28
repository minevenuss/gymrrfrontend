import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role.guard";
// import { Roles } from "../../core/utils/enum-roles.utils";

//solo el admin y el empleado podran entrar 

export const USERS_ROUTES: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/users-list-page/users-list-page.component').then(m=> m.UsersListPageComponent),
        // canActivate: [roleGuard(['Admin', 'Empleado'])],
        title: 'Usuarios - GymRR'
    }
];