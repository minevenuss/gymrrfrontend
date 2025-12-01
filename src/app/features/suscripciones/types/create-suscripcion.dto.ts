export interface CreateSuscripcionDto {
  estado: string;
  fechaInicio: Date;
  fechaFin: Date;
  estadoPago: string;

  userId: string;
  tipoSuscripcionId: number;
}
