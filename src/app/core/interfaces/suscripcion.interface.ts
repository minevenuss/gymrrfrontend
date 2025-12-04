import { TipoSuscripcion } from "./tipo-suscripcion.interface";

export interface Suscripcion {
    idSuscripcion: number;
    estado: "Activa" | "Inactiva" | "Cancelada";
    fechaInicio: Date;
    fechaFin: Date;
    estadoPago: "Pagado" | "NoPagado";
    NombreUsuario?: string;
    idTipoSuscripcion: number;
    tipoSuscripcion?: TipoSuscripcion;
    idUsuario: number;
}
