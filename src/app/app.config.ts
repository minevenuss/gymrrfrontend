import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { routes } from './app.routes';
import { provideHttpClient} from '@angular/common/http';
import { CORE_PROVIDERS } from './core/providers/core.providers';
import {APP_ROUTES} from "./core/config/routes.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    ...CORE_PROVIDERS
  ]
};
