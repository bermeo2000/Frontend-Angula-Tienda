import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../interface/marca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  getAllMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${environment.apiMarcas}`).pipe(
    );
  }


  createMarca(marcas: Marca): Observable<Marca> {
    return this.http.post<Marca>(environment.apiMarcas, marcas)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.apiMarcas}/${id}`)
  }
  

  update(marca: Marca): Observable<any> {
    return this.http.post<any>(`${environment.apiMarcas}/editar`, marca)
  }



}