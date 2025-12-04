import { Routes } from "@angular/router";

export const LANDING_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage), title: 'Home Page - Gym R&R'},
  { path: 'about', loadComponent: () => import('./pages/about-page/about-page').then(m => m.AboutPage), title: 'About Page - Gym R&R'},
  { path: 'contact', loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage), title: 'Contact Page - Gym R&R'}
]
