import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "../utils/token-storage.service";
import {catchError} from "rxjs/operators";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const tokenStorageService = inject(TokenStorageService);
    return next(req).pipe(
        catchError((error) => {
            if(error.status === 401) {
                // this.tokenStorageService.clear();
                router.navigate(['/auth/login']);
            }
            if(error.status === 403) {
                router.navigate(['/forbidden']);
            }
            console.error('HTTP Error:', error);
            throw error;
        })
    );
};

