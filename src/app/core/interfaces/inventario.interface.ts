export interface Inventario {
    IdInventario: number;
    Nombre: string;
    Categoria: string;
    Cantidad: number;
    Estado: 'Nuevo' | 'Usado';
    FechaRegistro?: Date;
    FechaActualizacion?: Date;
    Descripcion?: string;
}