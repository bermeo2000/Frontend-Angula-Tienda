// producto.model.ts
export interface TipoPeso {
    tipo: string;
    // otras propiedades si las hay
}

export interface Marca {
    descripcion: string;
}

export interface CategoriaProducto { 
    descripcion: string;
}

export interface Producto {
    productoId: number;
    nombre: string;
    precio: number;
    peso: number;
    imagen: string | ArrayBuffer;
    descripcion: string;
    estado?: boolean; 
    idTipoPeso: any; 
    idMarca: any; 
    idCategoriaProducto: any; 
    
}
