import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CategoriaTiendaComponent } from './components/categoria-tienda/categoria-tienda.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './prime-ng/primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { MarcaEditComponent } from './components/marca-edit/marca-edit.component';
import { TipoPesoComponent } from './components/tipo-peso/tipo-peso.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaProductoComponent } from './components/categoria-producto/categoria-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    MarcaComponent,
    CategoriaTiendaComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    MarcaEditComponent,
    TipoPesoComponent,
    ProductoComponent,
    CategoriaProductoComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BrowserAnimationsModule
    


  ],
  providers: [
    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
