import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipoPeso } from 'src/app/interface/tipo-peso';
import { TipoPesoService } from 'src/app/service/tipo-peso.service';

@Component({
  selector: 'app-tipo-peso',
  templateUrl: './tipo-peso.component.html',
  styleUrls: ['./tipo-peso.component.css']
})
export class TipoPesoComponent implements OnInit {

  formSavePeso!: FormGroup;
  formUpdatePeso!: FormGroup;
  tipoPeso: TipoPeso[] = [];
  idForUpdate: number = 0;
  pes: any
  visible: boolean = false;
  visibleDelete: boolean = false;
  pesoId: number = 0;
  submitted: boolean = false;
  visibleSave: boolean = false;

  constructor(private fb: FormBuilder,
    private tipoPesoService: TipoPesoService) {
    this.formSavePeso = this.fb.group({
      tipo: ['',],
    });
    this.formUpdatePeso = fb.group({
      tipo: ['',],
    });
  }


  ngOnInit(): void {
    this.getTipoPeso();
  }

  /* Metodo de mostrar la Peso */
  getTipoPeso() {
    this.tipoPesoService.getAllTipoPeso().subscribe(
      data => {
        this.tipoPeso = data
        console.log(this.tipoPeso)
      }
    );
  }

  /* Metodo de crear Tipo Peso */
  createTipoPeso() {
    this.submitted = true;
    if (this.formSavePeso.valid) {
      const newtipoPeso: TipoPeso = {
        pesoTipoId: 0,
        tipo: this.formSavePeso.value.tipo,
      };
      this.tipoPesoService.createTipoPeso(newtipoPeso).subscribe({
        next: () => {
          this.getTipoPeso();
          this.visibleSave = false;
        },
        error: (err) => {
          console.error('Error al guardar la Tipo Peso:', err);
        }
      });
    }
  }

  /* Metodo de eliminar Peso*/
  delete() {
    this.tipoPesoService.delete(this.pesoId).subscribe({
      next: () => {
        this.visibleDelete = false;
        this.getTipoPeso();
        this.pesoId = 0
      }
    });
  }

  /* Metodo de actualizar Peso */
  update() {
    if (this.formUpdatePeso.valid) {
      const updatedTipoPeso: TipoPeso = {
        pesoTipoId: this.idForUpdate,
        tipo: this.formUpdatePeso.value.tipo,
      }
      this.tipoPesoService.update(updatedTipoPeso).subscribe({
      });
      this.idForUpdate = 0;
      this.visible = false;
    }
  }

  edit(id: number) {
    this.idForUpdate = id;
    this.pes = this.tipoPeso.find(e => e.pesoTipoId == id);
    if (this.pes) {
      this.formUpdatePeso.controls['tipo'].setValue(this.pes?.tipo)
    }
    this.visible = true;
  }

  showSaveDialog() {
    this.formSavePeso.reset();
    this.visibleSave = true;
  }

  cancelSave() {
    this.visibleSave = false;
  }

  cancel() {
    this.visible = false;
  }

  showModalDelete(id: number) {
    this.pesoId = id;
    this.visibleDelete = true

  }



}
