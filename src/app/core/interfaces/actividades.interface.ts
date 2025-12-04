export interface Actividades {
    IdEvento: number;
    Nombre: string;
    Descripcion: string;
    Fecha?: string;
    HoraInicio?: string;
    HoraFin?: string;
    CupoMaximo: number;
    Estado: 'Pendiente' | 'Cancelada' | 'Activa';
}