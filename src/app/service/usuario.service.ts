import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interface/usuario'; 
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {


  constructor(private http: HttpClient) { }


  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUsuarios}`);
  }

  createUsuarios(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(environment.apiUsuarios, usuario);
  }
  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUsuarios}/`, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${environment.apiUsuarios}/editar`, usuario);
  }

  deleteUsuario(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiUsuarios}/${id}`);
  }
}
