import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/service/marca.service';
import { Marca } from 'src/app/interface/marca';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  visible: boolean = false;
  formSaveMarcas!: FormGroup;
  formUpdateMarcas!: FormGroup;
  marcas: Marca[] = [];
  idForUpdate: number = 0;
  marc: any
  visibleDelete: boolean = false;
  marcaId: number = 0;
  submitted: boolean = false;
  visibleSave: boolean = false;
  imageBase64: string | ArrayBuffer | null = null;

    // Definir las columnas para la exportación
    exportColumns: any[] = [
      { title: 'Code', dataKey: 'marcaId' },
      { title: 'Name', dataKey: 'descripcion' },
      { title: 'Image', dataKey: 'imagen' }
    ];

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.formSaveMarcas = this.fb.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', ]
    });
    this.formUpdateMarcas = fb.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', ]
    });
  }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas() {
    this.marcaService.getAllMarcas().subscribe(
      data => {
        this.marcas = data
        console.log(this.marcas)
      }
    );
  }

  // Create
  createMarca() {
    this.submitted = true;
    if (this.formSaveMarcas.valid) {
      const newMarca: Marca = {
        marcaId: 0,
        descripcion: this.formSaveMarcas.value.descripcion,
        imagen: this.imageBase64 ? this.imageBase64 : '' 
      };

      this.marcaService.createMarca(newMarca).subscribe({
        next: () => {
          this.getMarcas();
          this.visibleSave = false;
        },
        error: (err) => {
          console.error('Error al guardar la marca:', err);
        }
      });
    }
  }

  showSaveDialog() {
    this.formSaveMarcas.reset();
    this.visibleSave = true;
  }

  cancelSave() {
    this.visibleSave = false;
  }

  onFileChange(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result;
        this.formUpdateMarcas.controls['imagen'].setValue(this.imageBase64 as string);
      };
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    }
  }

  /* Eliminar*/
  delete() {
    this.marcaService.delete(this.marcaId).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.getMarcas()
        this.marcaId = 0
      }
    });
  }

  showModalDelete(id: number) {
    this.marcaId = id;
    this.visibleDelete = true

  }

  /* Actualizar */
  update() {
    if (this.formUpdateMarcas.valid) {
      const updatedMarca: Marca = {
        marcaId: this.idForUpdate,
        descripcion: this.formUpdateMarcas.value.descripcion,
        imagen: this.formUpdateMarcas.value.imagen
        
      };
      this.marcaService.update(updatedMarca).subscribe({
      });
      this.idForUpdate = 0;
      this.visible = false;
    }
  }

  edit(id: number) {
    this.idForUpdate = id;
    this.marc = this.marcas.find(e => e.marcaId == id);
    if (this.marc) {
      this.formUpdateMarcas.controls['descripcion'].setValue(this.marc?.descripcion)
      this.formUpdateMarcas.controls['imagen'].setValue(this.marc?.imagen)
    }
    this.visible = true;
  }
  


  cancel() {
    this.visible = false;
  }

  /* Regresar al home */
  navigateToHome() {
    this.router.navigate(['/home']); // Ruta al dashboard
  }

  /* Descargas */
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.marcas);
            doc.save('marcas.pdf');
        });
    });
}

exportCSV() {
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(this.marcas);
    const csvOutput = xlsx.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'marcas.csv');
  });
}

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const transformedData = this.marcas.map(marca => ({
        ...marca,
        estado: marca.estado ? 'true' : 'false' 
      }));
      const worksheet = xlsx.utils.json_to_sheet(transformedData);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Marcas');
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(excelBlob, 'marcas.xlsx');
    });
  }

}