import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaterialesService } from '../../../services/materiales.service';
import { TrabajadoresService } from '../../../services/trabajadores.service';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {
  form: FormGroup;
  clients: any[] = [];
  materials: any[] = [];
  selectedMaterials: any[] = [];
  trabajadores: any[] = [];
  selectedTrabajadores: any[] = [];
  totalPrice: number = 0;

  constructor(
    private _clienteService: ClientesService,
    private _materialesService: MaterialesService,
    private _trabajadoresService: TrabajadoresService,
    private formBuilder: FormBuilder
  ) {
    this.form = new FormGroup({
      clientSelect: new FormControl(''),
      //quantity: new FormControl('')
    });
  }

  ngOnInit() {
    this.clients = [];
    this.totalPrice = 0;
    this.form = this.formBuilder.group({
      clientSelect: [''],
      quantity: [''],
      totalPrice: [0]
    });

    this._clienteService.getClientes().subscribe(data => {
      this.clients = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        };
      });
    });
    this._materialesService.getMateriales().subscribe(data => {
      this.materials = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        };
      });
    });
    this._trabajadoresService.getTrabajadores().subscribe(data => {
      this.trabajadores = data.map((element: any) => {
        return {
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        };
      });
    });
  }

  selectMaterial(material: any) {
    // buscar si el material ya ha sido seleccionado previamente
    let selectedMaterial = this.selectedMaterials.find(m => m.id === material.id);

    if (selectedMaterial) {
      // si el material ya ha sido seleccionado, incrementar su cantidad en 1
      selectedMaterial.quantity++;
    } else {
      // si el material no ha sido seleccionado, agregarlo a la lista con una cantidad de 1
      selectedMaterial = { ...material, quantity: 1 };
      this.selectedMaterials.push(selectedMaterial);
    }

    this.updateTotalPrice();
    //console.log(this.totalPrice);
  }

  unselectMaterial(material: any) {
    this.materials.push(material);
    this.selectedMaterials = this.selectedMaterials.filter(m => m !== material);
    this.updateTotalPrice();
  }
  updateTotalPrice() {
    this.totalPrice = this.selectedMaterials.reduce((total, material) => total + (material.precio * material.quantity), 0);
  }

  incrementQuantity(material: any) {
    material.quantity++;
    this.updateTotalPrice();
  }

  selectTrabajador(trabajador: any) {
    this.selectedTrabajadores.push(trabajador);
    this.trabajadores = this.trabajadores.filter(m => m !== trabajador);
  }

  unselectTrabajador(trabajador: any) {
    this.trabajadores.push(trabajador);
    this.selectedTrabajadores = this.selectedTrabajadores.filter(m => m !== trabajador);
  }


}


