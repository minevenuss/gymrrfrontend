export interface CreateActividadDto {
    Nombre: string;
    Descripcion: string;
    Fecha?: Date;
    HoraInicio?: string;
    HoraFin?: string;
    CupoMaximo: number;
    Estado: 'Pendiente' | 'Cancelada' | 'Activa';
}