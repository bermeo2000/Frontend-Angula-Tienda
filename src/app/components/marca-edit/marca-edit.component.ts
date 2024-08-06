import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/service/marca.service';
import { Marca } from 'src/app/interface/marca';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* interface Product {
  name: string;
  code: string;
  image:string;
  description:string
  inventoryStatus:string
  category:string
  price:string
  
} */

@Component({
  selector: 'app-marca-edit',
  templateUrl: './marca-edit.component.html',
  styleUrls: ['./marca-edit.component.css']
})
export class MarcaEditComponent implements OnInit {
  value: string | undefined;
  marcas: Marca[] = [];
  marca: any
  marcasa!: Marca

  submitted: boolean = false;
  visible: boolean = false;

  marcaForm!: FormGroup;
  formUpdateMarcas!: FormGroup;

  customers!: any[];
  
  idForUpdate: number = 0;

  isUpdate: boolean = false;
  isAdd: boolean = false;


  constructor(
    private fb: FormBuilder, 
    private marcaService: MarcaService) 
    {
    this.marcaForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
    this.formUpdateMarcas = fb.group({
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getMarcas();
  }

  showDialog() {
    this.visible = true;
}


hideDialog() {
  this.visible = false;
}




  /* Metodo de mostrar la marcas */
  getMarcas() {
    this.marcaService.getAllMarcas().subscribe(
      data => {
        this.marcas = data
        console.log(this.marcas)
      }
    );
  }


update() {
  if (this.formUpdateMarcas.valid) {
    const updatedMarca: Marca = {
      marcaId: this.idForUpdate,
      descripcion: this.formUpdateMarcas.value.descripcion,
      imagen: this.formUpdateMarcas.value.imagen
    };
    this.marcaService.update(updatedMarca).subscribe({   
    });;

    // Limpiar formulario y estado de actualización
    this.isUpdate = false;
    this.idForUpdate = 0;
  }
}



  /* Metodo de editar, donde se muestra los datos que voy actualizar */
  edit(id: number) {
    this.visible = true;
    this.idForUpdate = id;
    this.marca = this.marcas.find(e => e.marcaId == id);
    if (this.marca) {
      this.formUpdateMarcas.controls['descripcion'].setValue(this.marca?.descripcion)
      this.formUpdateMarcas.controls['imagen'].setValue(this.marca?.imagen)
    }
    this.isUpdate = true;

  }



}
