import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaProducto, Producto, TipoPeso } from 'src/app/interface/producto';
import { Marca } from 'src/app/interface/marca';
import { CategoriaProductosService } from 'src/app/service/categoria-productos.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoPesoService } from 'src/app/service/tipo-peso.service';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {




  formSaveProducto!: FormGroup;
  formUpdateProducto!: FormGroup;
  producto: Producto[] = [];
  marcas: Marca[] = [];
  tipoPesos: TipoPeso[] = [];
  categoriaProducto: CategoriaProducto[] = [];
  idForUpdate: number = 0;
  prod: any
  visible: boolean = false;
  visibleDelete: boolean = false;
  idProducto: number = 0;
  submitted: boolean = false;
  visibleSave: boolean = false;
  imageBase64: string | ArrayBuffer | null = null;

  exportColumns = [
    { title: 'Codigo', dataKey: 'productoId' },
    { title: 'Nombre', dataKey: 'nombre' },
    { title: 'Precio', dataKey: 'precio' },
    { title: 'Peso', dataKey: 'peso' },
    { title: 'Descripción', dataKey: 'descripcion' },
    { title: 'Imagen', dataKey: 'imagen' },
    { title: 'Categoría', dataKey: 'idCategoriaProducto' },
    { title: 'Marca', dataKey: 'idMarca' }
  ];

  constructor(private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private tipoPesoService: TipoPesoService,
    private marcaService: MarcaService,
    private categoriaProductosService: CategoriaProductosService,

  ) {
    this.formSaveProducto = this.fb.group({
      nombre: [''],
      precio: [''],
      peso: [''],
      imagen: [''],
      descripcion: [''],
      idTipoPeso: [''],
      idCategoriaProducto: [''],
      idMarca: [''],

    });
    this.formUpdateProducto = fb.group({
      nombre: [''],
      precio: [''],
      peso: [''],
      imagen: [''],
      descripcion: [''],
      idTipoPeso: [''],
      idCategoriaProducto: [''],
      idMarca: [''],

    });
  }


  ngOnInit(): void {
    this.getProducto();
    this.loadSelectOptions()
  }

  /* Mostrar */

  loadSelectOptions() {
    this.tipoPesoService.getAllTipoPeso().subscribe(data => {
      this.tipoPesos = data;
    });
    this.marcaService.getAllMarcas().subscribe(data => {
      this.marcas = data;
    });
    this.categoriaProductosService.getAllCategoria().subscribe(data => {
      this.categoriaProducto = data;
    });
  }

  getProducto() {
    this.productoService.getAllProductos().subscribe(
      data => {
        this.producto = data
        console.log(this.producto)
      }
    );
  }

  /* Agregar */

  createProducto() {
    this.submitted = true;
    if (this.formSaveProducto.valid) {
      const newProducto: Producto = {
        productoId: 0,
        nombre: this.formSaveProducto.value.nombre,
        precio: this.formSaveProducto.value.precio,
        peso: this.formSaveProducto.value.peso,
        descripcion: this.formSaveProducto.value.descripcion,
        idTipoPeso: this.formSaveProducto.value.idTipoPeso,
        idCategoriaProducto: this.formSaveProducto.value.idCategoriaProducto,
        idMarca: this.formSaveProducto.value.idMarca,
        imagen: this.imageBase64 ? this.imageBase64 : ''
      };
      this.productoService.createProducto(newProducto).subscribe({
        next: (response) => {
          console.log("Producto creado con éxito", response);
          this.getProducto();
          this.visibleSave = false;
        },
        error: (err) => {
          console.error("Error al crear el producto", err);
          /* window.location.reload(); */
        }
      });
    }
  }

  cancelSave() {
    this.visibleSave = false;
  }


  showSaveDialog() {
    this.formSaveProducto.reset();
    this.visibleSave = true;
  }

    onFileChange(event: any) {
      const file = event.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageBase64 = reader.result;
          this.formUpdateProducto.controls['imagen'].setValue(this.imageBase64 as string);
        };
        reader.readAsDataURL(file);
      }
    }

  /*  Regresar al home */
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  /* Eliminar*/
  delete() {
    this.productoService.delete(this.idProducto).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.getProducto()
        this.idProducto = 0
      }
    });
  }

  showModalDelete(id: number) {
    this.idProducto = id;
    this.visibleDelete = true

  }

  /* Actualizar */
  edit(id: number) {
    this.idForUpdate = id;
    this.prod = this.producto.find(e => e.productoId == id);
    if (this.prod) {
      this.formUpdateProducto.controls['nombre'].setValue(this.prod?.nombre)
      this.formUpdateProducto.controls['precio'].setValue(this.prod?.precio)
      this.formUpdateProducto.controls['peso'].setValue(this.prod?.peso)
      this.formUpdateProducto.controls['imagen'].setValue(this.prod?.imagen)
      this.formUpdateProducto.controls['descripcion'].setValue(this.prod?.descripcion)
      this.formUpdateProducto.controls['idTipoPeso'].setValue(this.prod?.idTipoPeso)
      this.formUpdateProducto.controls['idCategoriaProducto'].setValue(this.prod?.idCategoriaProducto)
      this.formUpdateProducto.controls['idMarca'].setValue(this.prod?.idMarca)
    }
    this.visible = true;
  }

  update() {
    if (this.formUpdateProducto.valid) {
      const updatedProducto: Producto = {
        productoId: this.idForUpdate,
        nombre: this.formUpdateProducto.value.nombre,
        precio: this.formUpdateProducto.value.precio,
        peso: this.formUpdateProducto.value.peso,
        imagen: this.formUpdateProducto.value.imagen,
        descripcion: this.formUpdateProducto.value.descripcion,
        idTipoPeso: this.formUpdateProducto.value.idTipoPeso,
        idCategoriaProducto: this.formUpdateProducto.value.idCategoriaProducto,
        idMarca: this.formUpdateProducto.value.idMarca,
      };
      this.productoService.updateProducto(updatedProducto).subscribe({
      });
      this.idForUpdate = 0;
      this.visible = false;
    }
  }

  cancel() {
    this.visible = false;
  }

  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');

        // Prepara los datos para la tabla
        const tableData = this.producto.map((item: any) => ({
          productoId: item.productoId,
          nombre: item.nombre,
          precio: item.precio,
          peso: `${item.peso} ${item.idTipoPeso?.tipo || 'N/A'}`,
          descripcion: item.descripcion,
          imagen: item.imagen,
          idCategoriaProducto: item.idCategoriaProducto?.descripcion || 'N/A', // Manejo de propiedad anidada
          idMarca: item.idMarca?.descripcion || 'N/A'
        }));
        (doc as any).autoTable({
          columns: this.exportColumns,
          body: tableData
        });
        doc.save('producto.pdf');
      });
    });
  }


  exportCSV() {
    import('xlsx').then((xlsx) => {
      const processedData = this.producto.map((item: any) => ({
        productoId: item.productoId,
        nombre: item.nombre,
        precio: item.precio,
        pesoTipoPeso: `${item.peso} ${item.idTipoPeso?.tipo || 'N/A'}`,
        descripcion: item.descripcion,
        imagen: item.imagen,
        idCategoriaProducto: item.idCategoriaProducto?.descripcion || 'N/A',
        idMarca: item.idMarca?.descripcion || 'N/A'
      }));
      const worksheet = xlsx.utils.json_to_sheet(processedData);
      const csvOutput = xlsx.utils.sheet_to_csv(worksheet);
      const csvBlob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
      saveAs(csvBlob, 'producto.csv');
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      // Procesar los datos para combinar peso y tipoPeso en una sola columna y formatear estado
      const transformedData = this.producto.map(producto => ({
        productoId: producto.productoId,
        nombre: producto.nombre,
        precio: producto.precio,
        // Combinar peso y tipoPeso en una sola cadena
        pesoTipoPeso: `${producto.peso} ${producto.idTipoPeso?.tipo || 'N/A'}`,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        idCategoriaProducto: producto.idCategoriaProducto?.descripcion || 'N/A',
        idMarca: producto.idMarca?.descripcion || 'N/A',
        estado: producto.estado ? 'true' : 'false' // Convertir estado a string 'true' o 'false'
      }));
      const worksheet = xlsx.utils.json_to_sheet(transformedData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Producto');
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(excelBlob, 'productos.xlsx');
    });
  }

}
