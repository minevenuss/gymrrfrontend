import {Router, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import {inject} from '@angular/core';
import {filter} from 'rxjs/operators';

export function listenToRouterEvents() {
    const router = inject(Router);

    return router.events.pipe(
        filter(
            (event) =>
                event instanceof NavigationStart ||
                event instanceof NavigationEnd ||
                event instanceof NavigationError
        )
    );
}