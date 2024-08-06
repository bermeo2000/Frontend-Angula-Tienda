import { Component, OnInit } from '@angular/core';
import { CategoriaProductosService } from 'src/app/service/categoria-productos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaProducto} from 'src/app/interface/categoria-producto';
import { TiendaService } from 'src/app/service/tienda.service';
import { Tienda } from 'src/app/interface/tienda';
import { Producto } from 'src/app/interface/producto';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {

  formSaveProducto!: FormGroup;
  formUpdateProducto!: FormGroup;
  categoriaProducto: CategoriaProducto[] = [];
  tienda: Tienda[] = [];
  idForUpdate: number = 0;
  prod: any
  visible: boolean = false;
  visibleDelete: boolean = false;
  idProducto: number = 0;
  submitted: boolean = false;
  visibleSave: boolean = false;
  categoriaProductoId: number = 0;

  constructor(private fb: FormBuilder,
    private categoriaProductosService: CategoriaProductosService,
    private tiendaService: TiendaService
  ) {
    this.formSaveProducto = this.fb.group({
      descripcion: [''],
      idTienda: ['']
    

    });
    this.formUpdateProducto = fb.group({
      descripcion: [''],
      idTienda: ['']

    });
  }


  ngOnInit(): void {
    this.loadSelectOptions()
    this.getCategoriaProducto();
  }
  
  /* Mostrar */
  getCategoriaProducto() {
    this.categoriaProductosService.getAllCategoria().subscribe(
      data => {
        this.categoriaProducto = data
        console.log(this.categoriaProducto)
      }
    );
  }


  loadSelectOptions() {
    this.tiendaService.getAllTienda().subscribe(data => {
      this.tienda = data;
      console.log('Tienda Options:', this.tienda); 
    });
  }


  cancelSave() {
    this.visibleSave = false;
  }


  showSaveDialog() {
    this.formSaveProducto.reset();
    this.visibleSave = true;
  }


  /* Metodo de crear Producto */
  createProducto() {
    this.submitted = true;
    if (this.formSaveProducto.valid) {
        const newProducto: CategoriaProducto = {
            categoriaProductoId: 0,
            descripcion: this.formSaveProducto.value.descripcion,
            idTienda: this.formSaveProducto.value.idTienda,
          };

          this.categoriaProductosService.createCategoria(newProducto).subscribe({
              next: () => {
                  this.getCategoriaProducto();
                  this.visibleSave = false;
              },
              error: () => {
                  window.location.reload();
              }
          });
      }
  }

  delete() {
    console.log('ID a eliminar:', this.categoriaProductoId);
    this.categoriaProductosService.delete(this.categoriaProductoId).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.getCategoriaProducto();
        this.categoriaProductoId = 0;
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        // Puedes agregar lógica para manejar errores aquí
      }
    });
  }

  update() {
    if (this.formUpdateProducto.valid) {
      const updatedProducto: CategoriaProducto = {
        categoriaProductoId: this.idForUpdate,
        descripcion: this.formUpdateProducto.value.descripcion,
        idTienda: this.formUpdateProducto.value.idTienda
        
      };
      this.categoriaProductosService.update(updatedProducto).subscribe({
      });
      this.idForUpdate = 0;
      this.visible = false;
    }
  }
  

    edit(id: number) {
      this.idForUpdate = id;
      this.prod = this.categoriaProducto.find(e => e.categoriaProductoId == id);
      if (this.prod) {
        this.formUpdateProducto.controls['descripcion'].setValue(this.prod?.descripcion)
        this.formUpdateProducto.controls['idTienda'].setValue(this.prod?.idTienda)
      }
      this.visible = true;
    }

    showModalDelete(id: number) {
      this.categoriaProductoId = id;
      this.visibleDelete = true
  
    }

    cancel() {
      this.visible = false;
    }
  


}
