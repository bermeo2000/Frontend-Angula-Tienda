import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tienda } from '../interface/tienda'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getAllTienda(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${environment.apiTienda}`).pipe(
    );
  }

  createTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(environment.apiTienda, tienda)
  }


}
