import {Routes} from "@angular/router";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
                title: 'Iniciar Sesión - GymRR'
            },
            {
                path: 'register',
                //loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent), Esto no existe aun
                title: 'Registrarse - GymRR'
            },
            {path: '', redirectTo: 'login', pathMatch: 'full' }
        ]

    }
]
