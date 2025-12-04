import { Routes } from '@angular/router';

export const CARGOS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/cargo-page/cargo-page').then(m => m.CargoPage), title: 'Cargos - Gym R&R'}
]
