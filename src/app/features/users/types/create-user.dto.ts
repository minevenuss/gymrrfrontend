export interface CreateUserDto {
    UserName: string;
    Email: string;
    Password: string;
    primerNombre: string;
    primerApellido:string;
    Rol: 'Admin' | 'Empleado'| 'Cliente';
}