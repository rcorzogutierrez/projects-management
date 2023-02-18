import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialesService } from '../../../services/materiales.service';
import { TrabajadoresService } from '../../../services/trabajadores.service';
import { Materiales } from '../../../interfaces/materiales';
import { ProyectosService } from '../../../services/proyectos.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../../services/firebase-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {
  form: FormGroup;
  clients: any[] = [];
  clientSelect: any[] = [];
  materials: Materiales[] = [];
  trabajadores: any[] = [];
  selectedTrabajadores: any[] = [];
  //selectedMaterial: Materiales | null = null;
  selectedMaterials: Materiales[] = [];
  horas: any = 0;
  precioHora: any = 0;
  selectedTrabajadoresForms: FormGroup[] = [];
  subtotalTrabajadores: number[] = [];
  totalM: number = 0;
  totalT: number = 0;
  totalP: number = 0;
  MatPorcentaje: number = 0;
  startDate: Date  = new Date();
  endDate: Date  = new Date();
  subTotalMat = 0;
 
  


  constructor(
    private _proyectosServices: ProyectosService,
    private router: Router,
    private _clienteService: ClientesService,
    private _materialesService: MaterialesService,
    private _trabajadoresService: TrabajadoresService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private firebaseError: FirebaseErrorService

  ) {
    this.form = new FormGroup({
      clientSelect: new FormControl(''),
      clientType: new FormControl(''),
      projecType: new FormControl(''),
      materials: new FormArray([]),
      trabajadorP: new FormArray([]),
      //name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
      horas: new FormControl(),
      startDate: new FormControl(),
    endDate: new FormControl(),
      precioHora: new FormControl(),
      faseSelect: new FormControl(),
      categoria: new FormControl(),
    });
   
  }

  ngOnInit(): void {
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
    this.startDate = new Date();
    this.endDate = new Date();
  } 

  limpiarForm() {
    this.form.reset();   
    this.selectedMaterials = [];
    this.selectedTrabajadores = [];
    this.totalP = 0;
  }

  onCategoriaChange() {
   const categoriaControl = this.form.get('categoria');
    const categoria = categoriaControl?.value;    
    let porcentaje = 0;
    switch (categoria) {
      case 'platinum':
        porcentaje = 10;
        break;
      case 'gold':
        porcentaje = 5;
        break;
      case 'silver':
        porcentaje = 2.5;
        break;
      default:
        porcentaje = 0;
        break;
    }
    //this.subTotalMat = this.updateSubTotalMat() * (1 + porcentaje / 100);  
    return porcentaje
  }

  submitForm() {
    if (this.form.valid) {
      const proyecto = {
        totalProyecto: this.totalP,
        subTotalMat: this.updateSubTotalMat(),
        fechaCreacion: new Date(),
        fechaactualizacion: new Date(),
        fechaInicio: this.form.get('startDate')?.value,
        fechaFin: this.form.get('endDate')?.value,
        clientSelect: this.form.get('clientSelect')?.value,
        clientType: this.form.get('clientType')?.value,
        projecType: this.form.get('projecType')?.value,
        faseSelect:this.form.get('faseSelect')?.value,
        materials: this.selectedMaterials.map(material => material.id), // Solo se guardan los IDs de los materiales seleccionados
        trabajadores: this.selectedTrabajadores.map(trabajador => ({
          id: trabajador.id,
          horas: trabajador.horas,
          precioHora: trabajador.precioHora,
          subtotal: trabajador.subtotal
        }))
      };
      const idCliente = proyecto.clientSelect;
      this._proyectosServices.createProject(proyecto, idCliente).then(() => {
        this.toastr.info('Se ha guardado exitosamente el proyecto', 'Proyecto Guardado')
        this.form.reset();
        this.limpiarForm();
        this.router.navigate(['/list-clientes']);
      }).catch((error) => {
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error')
      });
    }

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
        this.updateSubTotalMat();
       // this.totalProyecto();
      });
      
    }
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
      this.calcularTrabajador();
    });
    this.selectedTrabajadoresForms.push(form);
    this.trabajadores = this.trabajadores.filter(m => m !== trabajador);

    // Create a new object with the form values and push it to Firebase
    const trabajadorData = {
      horas: 0,
      precioHora: 0,
      subtotal: 0,
      nombre: trabajador.nombre,
      apellidos: trabajador.apellidos    };
  
  }

  unselectTrabajador(trabajador: any) {
    delete trabajador.horas;
    delete trabajador.precioHora;
    delete trabajador.subtotal;
    delete trabajador.form;
    this.subtotalTrabajadores = this.subtotalTrabajadores.filter(m => m !== trabajador.subtotal);
    this.trabajadores.push(trabajador);
    this.selectedTrabajadores = this.selectedTrabajadores.filter(m => m !== trabajador);
    this.calcularTrabajador();
  }

  calcularTrabajador() {
    this.totalT = 0;
    this.selectedTrabajadores.forEach(trabajador => {
      this.totalT += trabajador.subtotal;
    });
  }

  removeMaterial(material: Materiales) {
    this.selectedMaterials = this.selectedMaterials.filter(
      selected => selected.id !== material.id
    );
  }

  updateSubTotalMat() {
    let totalM = 0;   
    this.selectedMaterials.forEach(material => {
      totalM += material.precio * material.quantity;           
    }); 
    this.totalM =totalM; 
    return totalM;
    
  }

  updateSubtotalTrab(selectedTrabajador: any) {
    selectedTrabajador.horas = selectedTrabajador.form.get('horas').value;
    selectedTrabajador.precioHora = selectedTrabajador.form.get('precioHora').value;
    selectedTrabajador.subtotal = selectedTrabajador.horas * selectedTrabajador.precioHora;
    //console.log(selectedTrabajador.horas)
    this.calcularTrabajador();
    this.totalProyecto()
  }

  matSubtotalPlusPorcentaje(){
    let valorComercial = this.updateSubTotalMat() * (1 + this.onCategoriaChange() / 100);
    return valorComercial  
    
  }

  totalProyecto() {
    this.totalP = this.totalM + this.totalT;
    this.MatPorcentaje = this.matSubtotalPlusPorcentaje()
  }


}


