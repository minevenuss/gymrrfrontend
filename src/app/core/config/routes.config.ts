import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
   {

    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
   },

   {
    path: 'auth',
    loadChildren: () =>
        import('../../features/auth/auth.routes').then(m=> m.AUTH_ROUTES)
   },
   {
      path: 'users',
      loadChildren: () =>
         import('../../features/users/users.routes').then(m=> m.USERS_ROUTES)
   },
    {
      path: 'actividades',
      loadChildren: () =>
         import('../../features/actividades/actividades.routes').then(m=> m.ACTIVIDADES_ROUTES)
   },
    {
      path: 'inventario',
      loadChildren: () =>
         import('../../features/inventario/inventario.routes').then(m=> m.INVENTARIO_ROUTES)
   }

//    {
//     path: 'dashboard',
//     loadComponent: () =>
//         import('../../features/dashboard/pages/dashboard.component')
//    },
]
