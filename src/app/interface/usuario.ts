export interface Usuario {
    usuarioId: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    cedula: string;
    telefono: string;
    imagen: string | ArrayBuffer;
    estado: boolean;
    nombreUsuario: string;
}
