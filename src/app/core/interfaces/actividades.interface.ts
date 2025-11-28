export interface Actividades {
    idEvento: number;
    nombre: string;
    descripcion: string;
    fecha?: Date;
    horaInicio?: string;
    horaFin?: string;
    cupoMaximo: number;
    estado: 'Pendiente' | 'Cancelada' | 'Activa';
}