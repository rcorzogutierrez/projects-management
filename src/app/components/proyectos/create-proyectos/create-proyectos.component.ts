import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialesService } from '../../../services/materiales.service';
import { TrabajadoresService } from '../../../services/trabajadores.service';
import { Materiales } from '../../../interfaces/materiales';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {
  form: FormGroup;
  clients: any[] = [];
  clientSelect = '';
  materials: Materiales[] = [];
  trabajadores: any[] = [];
  selectedTrabajadores: any[] = [];
  selectedMaterial: Materiales | null = null;
  selectedMaterials: Materiales[] = [];
  horas: any = 0;
  precioHora: any = 0;
  selectedTrabajadoresForms: FormGroup[] = [];
  subtotalTrabajadores: number[] = [];
  total: number = 0;
  totalT: number = 0;
  totalP: number = 0;
  private selectedMaterialQuantities = new Map<number, FormControl>();

  constructor(
    private _clienteService: ClientesService,
    private _materialesService: MaterialesService,
    private _trabajadoresService: TrabajadoresService,
    
  ) {
    this.form = new FormGroup({
      clientSelect: new FormControl(''),
      clientType:new FormControl(''),
      projecType:new FormControl(''),
      materials: new FormArray([]),
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      horas: new FormControl(),
      precioHora: new FormControl()
    });
  }

  ngOnInit() {
    this.clients = [];
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

  onSelected(value:string): void {
		this.clientSelect= value;

	}

 addMaterial(material: Materiales) {
    if (material && material.id) {
      let selectedMaterial = this.selectedMaterials.find(m => m.id === material.id);
      let initialQuantity = 1;
      if (!selectedMaterial) {
        this.selectedMaterials.push({ ...material, quantity: 1 });
        selectedMaterial = this.selectedMaterials[this.selectedMaterials.length - 1];
      } else {
        initialQuantity = selectedMaterial.quantity;
        selectedMaterial.quantity += 1;
      }
      this.form.addControl(`quantity_${material.id}`, new FormControl(initialQuantity));
      this.form.get(`quantity_${material.id}`)?.valueChanges.subscribe(quantity => {
        this.updateTotal();
      });
      this.totalProyecto()
    }
  } 

 

 removeMaterial(material: Materiales) {
    this.selectedMaterials = this.selectedMaterials.filter(
      selected => selected.id !== material.id
    );
  } 
 updateTotal() {
    let total = 0;
    this.selectedMaterials.forEach(material => {
      total += material.precio * material.quantity;
    });
    return total;
  } 

  

  selectTrabajador(trabajador: any) {
    this.selectedTrabajadores.push(trabajador);
    const form = new FormGroup({
      horas: new FormControl(0),
      precioHora: new FormControl(0)
    });
    trabajador.form = form;
    form.valueChanges.subscribe(values => {
      trabajador.horas = values.horas;
      trabajador.precioHora = values.precioHora;
      trabajador.subtotal = trabajador.horas * trabajador.precioHora;
      this.calcularTotal();
    });
    this.selectedTrabajadoresForms.push(form);
    this.trabajadores = this.trabajadores.filter(m => m !== trabajador);
  }

  unselectTrabajador(trabajador: any) {
    delete trabajador.horas;
    delete trabajador.precioHora;
    delete trabajador.subtotal;
    delete trabajador.form;
    this.subtotalTrabajadores = this.subtotalTrabajadores.filter(m => m !== trabajador.subtotal);
    this.trabajadores.push(trabajador);
    this.selectedTrabajadores = this.selectedTrabajadores.filter(m => m !== trabajador);
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalT = 0;
    this.selectedTrabajadores.forEach(trabajador => {
      this.totalT += trabajador.subtotal;
    });
  }

  updateSubtotal(selectedTrabajador: any) {
    selectedTrabajador.horas = selectedTrabajador.form.get('horas').value;
    selectedTrabajador.precioHora = selectedTrabajador.form.get('precioHora').value;
    selectedTrabajador.subtotal = selectedTrabajador.horas * selectedTrabajador.precioHora;
    console.log(selectedTrabajador.horas)
    this.calcularTotal();
    this.totalProyecto()
  }

  totalProyecto() {
    this.totalP = this.updateTotal() + this.totalT;
  } 
}


