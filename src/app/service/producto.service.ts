import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../interface/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getAllProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.apiProductos}`).pipe(
    );
  }


  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(environment.apiProductos, producto)
  }


    // Actualizar un producto existente
    updateProducto(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(`${environment.apiProductos}/editar`, producto).pipe(
      );
    }
    delete(id:number){
      return this.http.delete<any>(`${environment.apiProductos}/${id}`)
    }
  
  }
  
  