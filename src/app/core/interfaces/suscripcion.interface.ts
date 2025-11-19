import { TipoSuscripcion } from "./tipo-suscripcion.interface";

export interface Suscripcion {
    idSuscripcion: number;
    estado: "Activa" | "Inactiva" | "Cancelada";
    fechaInicio: Date;
    fechaFin: Date;
    estadoPago: "Pagado" | "NoPagado";
    idTipoSuscripcion: number;
    tipoSuscripcion?: TipoSuscripcion;
    idUsuario: number;
}