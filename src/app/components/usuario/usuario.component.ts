import { Component,OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      data => {
        this.usuarios = data;
        console.log(this.usuarios)
      }
    )
  }




}