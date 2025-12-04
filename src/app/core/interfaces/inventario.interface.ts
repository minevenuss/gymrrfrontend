export interface Inventario {
    IdInventario: number;
    nombre: string;
    categoria: string;
    cantidad: number;
    estado: 'Nuevo' | 'Usado';
    fechaRegistro?: Date;
    fechaActualizacion?: Date;
    descripcion?: string;
}