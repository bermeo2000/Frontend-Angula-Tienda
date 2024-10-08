import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CategoriaTiendaComponent } from './components/categoria-tienda/categoria-tienda.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { TipoPesoComponent } from './components/tipo-peso/tipo-peso.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaProductoComponent } from './components/categoria-producto/categoria-producto.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 

  { path: 'signup', component: SignupComponent },

  { path: 'login', component: LoginComponent },

{ path: 'nav', component: NavbarComponent },

  { path: 'home', component: HomeComponent },
  { path: 'regis', component: RegistroUsuarioComponent },
  { path: 'categoriaTiendas', component: CategoriaTiendaComponent },

  { path: 'perfil', component: UsuarioComponent },

  { path: 'producto', component: ProductoComponent },
  { path: 'marcas', component: MarcaComponent },
  { path: 'categoriaProducto', component: CategoriaProductoComponent },
  { path: 'tipoPeso', component: TipoPesoComponent },



  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
