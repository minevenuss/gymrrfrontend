export interface Inventario {
    idInventario: number;
    nombre: string;
    categoria: string;
    cantidad: number;
    estado: 'Nuevo' | 'Usado';
    fechaRegistro?: Date;
    fechaActualizacion?: Date;
    descripcion?: string;
}