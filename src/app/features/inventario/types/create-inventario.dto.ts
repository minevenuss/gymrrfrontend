export interface CreateInventarioDto {
    Nombre: string;
    Categoria: string;
    Cantidad: number;
    Estado: 'Nuevo' | 'Usado';
    // fechaRegistro?: Date;
    // fechaActualizacion?: Date;
    Descripcion?: string;
}