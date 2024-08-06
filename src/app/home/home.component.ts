import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  sidebarVisible = false;
  logoTitle = 'Mi Tienda';
  
  menuItems = [
    { label: 'Mi perfil', icon: 'pi pi-user', routerLink: ['/perfil'] },
    { label: 'Categoria Tiendas', icon: 'pi pi-th-large', routerLink: ['/categoriaTiendas'] },
    { label: 'Productos', icon: 'pi pi-box', routerLink: ['/producto'] },
    { label: 'Marcas', icon: 'pi pi-tag', routerLink: ['/marcas'] },
    { label: 'Categoria Producto', icon: 'pi pi-tags', routerLink: ['/categoriaProducto'] },
    { label: 'Tipo Peso', icon: 'pi pi-tags', routerLink: ['/tipoPeso'] },
    { label: 'Configuración', icon: 'pi pi-cog', routerLink: ['/configuracion'] }
  ];

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit(): void {}

}