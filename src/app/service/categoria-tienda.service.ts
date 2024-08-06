import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CategoriaTienda} from '../interface/categoria-tienda'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaTiendaService {


  constructor(private http: HttpClient) { }

  getAllCategoria(): Observable<CategoriaTienda[]> {
    return this.http.get<CategoriaTienda[]>(`${environment.apiCategoriasTienda}`).pipe(
    );
  }

  createCategoria(categoriaTienda: CategoriaTienda): Observable<CategoriaTienda> {
    return this.http.post<CategoriaTienda>(environment.apiCategoriasTienda, categoriaTienda).pipe(
    );
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.apiCategoriasTienda}/${id}`)
  }

  update(categoriaTienda: CategoriaTienda): Observable<any> {
    return this.http.post<any>(`${environment.apiCategoriasTienda}/editar`, categoriaTienda)
  }


}
