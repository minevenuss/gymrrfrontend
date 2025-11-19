import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "../utils/token-storage.service";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenStorageService);
    const token = tokenService.getToken();
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
    }
});
    }
    return next(req);
}