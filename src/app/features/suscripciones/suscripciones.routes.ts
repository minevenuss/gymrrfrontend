import { Routes } from "@angular/router";

export const SUSCRIPCIONES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/suscripciones-page/suscripciones-page').then(m => m.SuscripcionesPage), title: 'Suscripciones - Gym R&R'}
]
