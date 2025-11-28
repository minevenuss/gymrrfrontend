export const RouteHelpers = {
    user: (id: number | string) => `/user/${id}`,
    cargo: (id: number | string) => `/cargo/${id}`,
    tipoSuscripcion: (id: number | string) => `/tipos-suscripcion/${id}`,
    suscripcion: (id: number | string) => `/suscripciones/${id}`,
    actividades: (id:number | string) => `/actividades/${id}`,
    inventario: (id:number | string) => `/inventario/${id}`,
    renovarSuscripcion: (id: number | string) => `/suscripciones/${id}/renovar`,
    marcargPago: (id: number | string) => `/suscripciones/${id}/marcar-pago`,
    filtroPago: (estado: string) => `/suscripciones?estadopago=${estado}`,
}