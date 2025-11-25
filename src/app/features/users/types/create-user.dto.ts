export interface CreateUserDto {
    userName: string;
    email: string;
    password: string;
    primerNombre: string;
    primerApellido:string;
    rol: 'Admin' | 'Empleado'| 'Cliente';
}