export interface User {
    Id: string;
    userName: string;
    email: string;
    primerNombre: string;
    primerApellido: string;
    fechaCreacion: Date;
    rol: "Admin" | "Empleado" | "Cliente";
}
