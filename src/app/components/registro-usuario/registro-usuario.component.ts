import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit  {

  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  imageBase64: string | ArrayBuffer | null = null;

    constructor(
      private fb: FormBuilder, 
      private usuarioService: UsuarioService,
      private router: Router
    ) 
      {
      this.usuarioForm = this.fb.group({
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        imagen: ['',],
        nombreUsuario: ['', [Validators.required]],
      });
    }



  ngOnInit(): void {
/*     this.getUsuarios(); */
  }

/*   getUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe(
      data => {
        this.usuarios = data;
        console.log(this.usuarios)
      }
    )
  }
 */

  registro(): void {
    const newMarca = this.usuarioForm.value;
    this.usuarioService.createUsuarios(newMarca).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        Swal.fire({
          icon: 'success',
          title: 'Usuario guardada!',
          text: 'La nueva Usuario se ha guardado correctamente.'
        }).then(() => {
        /*   this.getUsuarios();   */// Recarga la lista de marcas
          this.usuarioForm.reset();  // Limpia el formulario
        });
      },
      error: error => {
        console.error('Error al guardar la marca:', error);
        Swal.fire({
          icon: 'error',
          title: 'NombreUsuario ya existe',
          text: 'Puede usar otro nombre de usuario.'
        });
      }
    });
  }

  onFileChange(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.usuarioForm.controls['imagen'].setValue(this.imageBase64);
      };
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    }
  }


}
