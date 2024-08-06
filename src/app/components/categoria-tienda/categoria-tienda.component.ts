import { Component, OnInit } from '@angular/core';
import { CategoriaTiendaService } from 'src/app/service/categoria-tienda.service';
import { CategoriaTienda } from 'src/app/interface/categoria-tienda';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';




@Component({
  selector: 'app-categoria-tienda',
  templateUrl: './categoria-tienda.component.html',
  styleUrls: ['./categoria-tienda.component.css']
})
export class CategoriaTiendaComponent implements OnInit {

  formSaveCategoria!: FormGroup;
  formUpdateCategoria!: FormGroup;
  categoriaTienda: CategoriaTienda[] = [];
  idForUpdate: number = 0;
  categori: any
  visible: boolean = false;
  visibleDelete: boolean = false;
  categoriaId: number = 0;
  submitted: boolean = false;
  visibleSave: boolean = false;

      // Definir las columnas para la exportación
      exportColumns: any[] = [
        { title: 'Code', dataKey: 'tiendaCategoriaId' },
        { title: 'Nombre', dataKey: 'descripcion' },
        { title: 'Descripcion', dataKey: 'nombre' }
      ];


  constructor(private fb: FormBuilder,
    private categoriaTiendaService: CategoriaTiendaService,
    private router: Router) {
    this.formSaveCategoria = this.fb.group({
      descripcion: ['',],
      nombre: ['',],
    });
    this.formUpdateCategoria = fb.group({
      descripcion: ['',],
      nombre: ['',],
    });
  }

  ngOnInit(): void {
    this.getCategoria();
  }

  /* Metodo de mostrar la categoria */
  getCategoria() {
    this.categoriaTiendaService.getAllCategoria().subscribe(
      data => {
        this.categoriaTienda = data
        console.log(this.categoriaTienda)
      }
    );
  }

  /* Metodo de crear Categoria */
  createCategoria() {
    this.submitted = true;
    if (this.formSaveCategoria.valid) {
      const newCategoria: CategoriaTienda = {
        tiendaCategoriaId: 0,
        descripcion: this.formSaveCategoria.value.descripcion,
        nombre: this.formSaveCategoria.value.nombre
      };
      this.categoriaTiendaService.createCategoria(newCategoria).subscribe({
        next: () => {
          this.getCategoria();
          this.visibleSave = false;
        },
        error: (err) => {
          console.error('Error al guardar la categoria tienda:', err);
        }
      });
    }
  }


  /* Metodo de eliminar categoria*/
  delete() {
    this.categoriaTiendaService.delete(this.categoriaId).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.getCategoria();
        this.categoriaId = 0
      }
    });
  }

  /* Metodo de actualizar categoria */
  update() {
    if (this.formUpdateCategoria.valid) {
      const updatedCategoria: CategoriaTienda = {
        tiendaCategoriaId: this.idForUpdate,
        descripcion: this.formUpdateCategoria.value.descripcion,
        nombre: this.formUpdateCategoria.value.nombre
      }
      this.categoriaTiendaService.update(updatedCategoria).subscribe({
      });
      this.idForUpdate = 0;
      this.visible = false;
    }
  }

  /* Metodo de editar, donde se muestra los datos que voy actualizar */
  edit(id: number) {
    this.idForUpdate = id;
    this.categori = this.categoriaTienda.find(e => e.tiendaCategoriaId == id);
    if (this.categori) {
      this.formUpdateCategoria.controls['descripcion'].setValue(this.categori?.descripcion)
      this.formUpdateCategoria.controls['nombre'].setValue(this.categori?.nombre)
    }
    this.visible = true;
  }

  showSaveDialog() {
    this.formSaveCategoria.reset();
    this.visibleSave = true;
  }

  cancelSave() {
    this.visibleSave = false;
  }

  cancel() {
    this.visible = false;
  }

  showModalDelete(id: number) {
    this.categoriaId = id;
    this.visibleDelete = true

  }

  navigateToHome() {
    this.router.navigate(['/home']); // Ruta al dashboard
  }



  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.categoriaTienda);
            doc.save('categoriaTienda.pdf');
        });
    });
}

exportCSV() {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(this.categoriaTienda);
    const csvOutput = xlsx.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'CategoriaTienda.csv');
  });
}

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const transformedData = this.categoriaTienda.map(categoriaTiendas => ({
        ...categoriaTiendas,
        estado: categoriaTiendas.estado ? 'true' : 'false' 
      }));
      const worksheet = xlsx.utils.json_to_sheet(transformedData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'TiendaCategoria');
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(excelBlob, 'tiendaCategoria.xlsx');
    });
  }







}
