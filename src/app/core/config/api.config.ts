export const API_CONFIG = {
    BASE_URL: 'https://localhost:7158/api',

AUTH: {
    LOGIN: '/login',
    REGISTER: '/register-extended'
},
USERS: {
    GET_ALL: '/Cuenta/ObtenerCuentas',
    GET_BY_ID: (id: string) => `/Cuenta/ObtenerPorId/${id}`,
    UPDATE: (id: string) => `/Cuenta/ActualizarCUenta/${id}`,
    DELETE: (id: string) => `/Cuenta/EliminarCuenta/${id}`
},

CARGOS: {
    GET_ALL: '/Cargos/ObtenerCargos/',
    GET_BY_ID: (id: number) => `/Cargos/ObtenerCargoPorID/${id}`,
    CREATE: '/Cargos/CrearCargo',
    UPDATE: (id: number) => `/Cargos/ActualizarCargo/${id}`,
    DELETE: (id: number) => `/Cargos/EliminarCargoPorID/${id}`
},

SUSCRICPIONES: {
    GET_ALL: '/Suscripcion/ObtenerSuscripciones',
    GET_BY_ID: (id: number) => `/Suscripcion/ObtenerSuscripcionPorID/${id}`,
    CREATE: '/Suscripcion/CrearSuscripcion',
    UPDATE: (id: number) => `/Suscripcion/ActualizarSuscripcion/${id}`,
    DELETE: (id: number) => `/Suscripcion/EliminarSuscripcionPorID/${id}`,
    FILTER_BY_ESTADO_PAGO: (pagado: boolean) => `/Suscripcion/FiltrarPorEstadoPago?pagado=${pagado}`,
    MARCAR_PAGO: (id: number) => `/Suscripcion/MarcarPago/${id}`,
    RENOVAR_SUSCRIPCION: (id: number) => `/Suscripcion/RenovarSuscripcion/${id}`
},

TIPOS_SUSCRICIPION: {
    GET_ALL: 'TipoSuscripcion/ObtenerTiposSuscripciones',
    GET_BY_ID: (id: number) => `TipoSuscripcion/ObtenerTipoSuscripcion/${id}`,
    CREATE: 'TipoSuscripcion/CrearTipoSuscripcion',
    UPDATE: (id: number) => `TipoSuscripcion/ActualizarTipoSuscripcion/${id}`,
    DELETE: (id: number) => `TipoSuscripcion/EliminarTipoSuscripcion/${id}`
},

ACTIVIDADES: {
    GET_ALL: '/Actividades/ObtenerActividades',
    GET_BY_ID: (id:number) => `/Actividades/ObtenerActividadPorID/${id}`,
    CREATE: '/Actividades/CrearActividad',
    UPDATE: (id: number) => `/Actividades/ActualizarActividad/${id}`,
    DELETE: (id: number) => `/Actividades/EliminarActividadPorID/${id}`

},

INVENTARIO: {
    GET_ALL: '/Inventario/ObtenerInventario/',
    GET_BY_ID: (id:number) => `/Inventario/ObtenerInventarioPorID/${id}`,
    CREATE: '/Inventario/CrearInventario',
    UPDATE: (id: number) => `/Inventario/ActualizarInventario/${id}`,
    DELETE: (id: number) => `/Inventario/EliminarInventarioPorID/${id}`

}


};
