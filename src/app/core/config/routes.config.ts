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
   }

//    {
//     path: 'dashboard',
//     loadComponent: () =>
//         import('../../features/dashboard/pages/dashboard.component')
//    },
]