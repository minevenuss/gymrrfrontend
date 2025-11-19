export const API_CONFIG = {
    BASE_URL: 'https://localhost:3000/api',
 
AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
},
USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id: number) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`
},

CARGOS: {
    GET_ALL: '/cargos',
    GET_BY_ID: (id: number) => `/cargos/${id}`,
    CREATE: '/cargos',
    UPDATE: (id: number) => `/cargos/${id}`,
    DELETE: (id: number) => `/cargos/${id}`
},

SUSCRICPIONES: {
    GET_ALL: '/suscripciones',
    GET_BY_ID: (id: number) => `/suscripciones/${id}`,
    CREATE: '/suscripciones',
    UPDATE: (id: number) => `/suscripciones/${id}`,
    DELETE: (id: number) => `/suscripciones/${id}`,
    MARCAR_PAGO: (id: number) => `/suscripciones/${id}/marcar-pago`,
    RENOVAR_SUSCRIPCION: (id: number) => `/suscripciones/${id}/renovar`,
    FILTER_BY_ESTADO_PAGO: (estado: string) => `/suscripciones?estadoPago=${estado}`

},

TIPOS_SUSCRICIPION: {
    GET_ALL: '/tipos-suscripcion',
    GET_BY_ID: (id: number) => `/tipos-suscripcion/${id}`,
    CREATE: '/tipos-suscripcion',
    UPDATE: (id: number) => `/tipos-suscripcion/${id}`,
    DELETE: (id: number) => `/tipos-suscripcion/${id}`
}
};