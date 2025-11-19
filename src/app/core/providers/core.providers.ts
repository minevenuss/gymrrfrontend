import { httpClientProvider } from "./http-client.provider";
import { routerProvider } from "./router.provider";
import { authProvider } from "./auth.provider";
import { errorHandlerProvider } from "./error-handler.provider";

export const CORE_PROVIDERS = [
    ...httpClientProvider,
    ...routerProvider,
    authProvider,
    ...errorHandlerProvider
]