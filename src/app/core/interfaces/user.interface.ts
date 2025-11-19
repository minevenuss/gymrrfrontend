export interface User {
    id: number;
    userName: string;
    email:string;
    primerNombre: string;
    primerApellido: string;
    fechaCreacion: Date;
    rol: "Admin" | "Empleado" | "Cliente";
}