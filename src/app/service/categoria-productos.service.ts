import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaProducto } from '../interface/categoria-producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductosService {

  constructor(private http: HttpClient) { }

  getAllCategoria(): Observable<CategoriaProducto[]> {
    return this.http.get<CategoriaProducto[]>(`${environment.apiCategoriaProducto}`).pipe(
    );
  }

  createCategoria(categoriaProducto: CategoriaProducto): Observable<CategoriaProducto> {
    return this.http.post<CategoriaProducto>(`${environment.apiCategoriaProducto}`, categoriaProducto)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.apiCategoriaProducto}/${id}`)
  }

  update(categoriaProducto: CategoriaProducto): Observable<any> {
    return this.http.post<any>(`${environment.apiCategoriaProducto}/editar`, categoriaProducto)
  }
}
