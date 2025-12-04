export interface User {
    UserId: string;
    UserName: string;
    Email: string;
    primerNombre: string;
    primerApellido: string;
    fechaCreacion: Date;
    Rol: "Admin" | "Empleado" | "Cliente";
}
