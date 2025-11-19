import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {authTokenInterceptor} from "../interceptors/auth-token.interceptor";
import {errorInterceptor} from "../interceptors/error.interceptor";
import { loadingInterceptor } from "../interceptors/loading.interceptor";

export const httpClientProvider = [
     provideHttpClient(
        withInterceptors([
            authTokenInterceptor, 
            errorInterceptor,
            loadingInterceptor
        ])
    )
];