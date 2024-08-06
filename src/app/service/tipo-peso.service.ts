import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPeso } from '../interface/tipo-peso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPesoService {

  constructor(private http: HttpClient) { }

  getAllTipoPeso(): Observable<TipoPeso[]> {
    return this.http.get<TipoPeso[]>(`${environment.apiTipoPeso}`).pipe(
    );
  }


  createTipoPeso(tipoPeso: TipoPeso): Observable<TipoPeso> {
    return this.http.post<TipoPeso>(environment.apiTipoPeso, tipoPeso)
  }

  delete(id:number){
    return this.http.delete<any>(`${environment.apiTipoPeso}/${id}`)
  }
  

  update(tipoPeso: TipoPeso): Observable<any> {
    return this.http.post<any>(`${environment.apiTipoPeso}/editar`, tipoPeso)
  }
}
