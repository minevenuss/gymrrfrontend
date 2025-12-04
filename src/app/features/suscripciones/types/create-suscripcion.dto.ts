export interface CreateSuscripcionDto {
  estado:  "Activa" | "Inactiva" | "Cancelada";
  fechaInicio: Date;
  fechaFin: Date;
  estadoPago: string;

  userId: string;
  tipoSuscripcionId: number;
}
