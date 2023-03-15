import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialesService } from '../../../services/materiales.service';
import { TrabajadoresService } from '../../../services/trabajadores.service';
import { Materiales } from '../../../interfaces/materiales';
import { ProyectosService } from '../../../services/proyectos.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from '../../../services/firebase-error.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
  selectedMaterials: { id: number, nombre: string, precio: number, cantidad: number, formGroup: FormGroup }[] = [];
  trabajadores: any[] = [];
  selectedTrabajadores: any[] = [];
  horas: any = 0;
  precioHora: any = 0;
  selectedTrabajadoresForms: FormGroup[] = [];
  subtotalTrabajadores: number[] = [];
  totalM: number = 0;
  totalT: number = 0;
  totalP: number = 0;
  total: number = 0;
  MatPorcentaje: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  subTotalMat = 0;
  porcentaje = 0;
  selectedMaterials$ = new BehaviorSubject<any[]>([]);
  selectedCategory: string | null = null;

  constructor(
    private _proyectosServices: ProyectosService,
    private router: Router,
    private _clienteService: ClientesService,
    private _materialesService: MaterialesService,
    private _trabajadoresService: TrabajadoresService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private firebaseError: FirebaseErrorService,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    this.form = this.formBuilder.group<{ [key: string]: AbstractControl }>({
      clientSelect: this.formBuilder.control(''),
      clientType: this.formBuilder.control(''),
      projecType: this.formBuilder.control(''),
      materials: this.formBuilder.array([]),
      trabajadorP: this.formBuilder.array([]),
      horas: this.formBuilder.control(''),
      startDate: this.formBuilder.control(''),
      endDate: this.formBuilder.control(''),
      precioHora: this.formBuilder.control(''),
      faseSelect: this.formBuilder.control(''),
      categoria: this.formBuilder.control(''),  
    });
  }

  ngOnInit(): void {
    this.clients = [];
    this.onCategoriaChange();
    this._materialesService.getMateriales().subscribe(materiales => this.materials = materiales);
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
    this.totalT = 0;
    this.porcentaje = 0;
    this.form.get('clientSelect')?.setValue('');
    this.form.get('clientType')?.setValue('');
    this.form.get('projecType')?.setValue('');
    this.form.get('faseSelect')?.setValue('');
    this.form.get('categoria')?.setValue('');    
  }

  onCategoriaChange() {
    const categoriaControl = this.form.get('categoria');
    const categoria = categoriaControl?.value;
    switch (categoria) {
      case 'platinum':
        this.porcentaje = 10;
        break;
      case 'gold':
        this.porcentaje = 5;
        break;
      case 'silver':
        this.porcentaje = 2.5;
        break;
        case 'variable':
          const porcentaje = prompt('Ingrese el porcentaje');
          if (porcentaje !== null) {
            this.porcentaje = parseFloat(porcentaje) || 0;
          } else {
            this.porcentaje = 0;
          }
        break;
      default:
        this.porcentaje = 0;
        break;
    }   
    this.selectedCategory = categoria;
    this.updateSubTotalMat();
}

  submitForm() {
    if (this.form.valid) {
      const proyecto = {
        totalProyecto: this.totalP,
        subTotalMat: this.updateSubTotalMat(),
        subtotalTrabajadores: this.calcularTrabajador(),
        fechaCreacion: new Date(),
        fechaactualizacion: new Date(),
        fechaInicio: this.form.get('startDate')?.value,
        fechaFin: this.form.get('endDate')?.value,
        clientSelect: this.form.get('clientSelect')?.value,
        clientType: this.form.get('clientType')?.value,
        projecType: this.form.get('projecType')?.value,
        faseSelect: this.form.get('faseSelect')?.value,
        categoria: this.form.get('categoria')?.value,
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
      apellidos: trabajador.apellidos
    };
  }

  unselectTrabajador(trabajador: any) {
    delete trabajador.horas;
    delete trabajador.precioHora;
    delete trabajador.subtotal;
    delete trabajador.form;
    this.subtotalTrabajadores = this.subtotalTrabajadores.filter(m => m !== trabajador.subtotal);
    this.trabajadores.push(trabajador);
    this.selectedTrabajadores = this.selectedTrabajadores.filter(m => m !== trabajador);
    this.totalT = this.calcularTrabajador(); // recalcular el total de trabajadores seleccionados
    this.total = this.totalM + this.totalT;
  }

  calcularTrabajador() {
    let totalTrabajador = 0;
    this.selectedTrabajadores.forEach(trabajador => {
      totalTrabajador += trabajador.subtotal;
    });
    return totalTrabajador;
  }

  addMaterial(material: Materiales) {
    if (material && material.id) {
      let selectedMaterial = this.selectedMaterials.find(m => m.id === material.id);
      if (!selectedMaterial) {
        const formGroup = new FormGroup({
          quantity: new FormControl(1)
        });
        selectedMaterial = { id: material.id, nombre: material.nombre, precio: material.precio, cantidad: 1, formGroup };
        this.selectedMaterials.push(selectedMaterial);
        formGroup.get('quantity')?.valueChanges.subscribe(() => {
          this.totalM = this.updateSubTotalMat();
        });
      } else {
        selectedMaterial.cantidad += 1;
        selectedMaterial.formGroup.get('quantity')?.setValue(selectedMaterial.cantidad);
      }
      this.totalM = this.updateSubTotalMat();
      this.changeDetectorRef.detectChanges();
    }
  }

  removeMaterial(material: { id: number, nombre: string, precio: number, cantidad: number, formGroup: FormGroup }) {
    let index = this.selectedMaterials.findIndex(m => m.id === material.id);
    if (index !== -1) {
      this.selectedMaterials.splice(index, 1);
      this.totalM = this.updateSubTotalMat(); // Actualiza el valor de totalM después de eliminar el material
      this.changeDetectorRef.detectChanges();
    }
  }

  updateSubTotalMat() {   
    let totalM = 0;
    this.selectedMaterials.forEach(material => {
      totalM += material.precio * material.formGroup.get('quantity')?.value;
    });
    this.totalM = totalM;
    this.total = this.totalM + this.totalT;
    if (this.selectedCategory) {
      this.subTotalMat = this.totalM * (1 + this.porcentaje / 100);
    } else {
      this.subTotalMat = this.totalM;
    }
    return totalM;
  }

  calcularSubtotalGeneral() {
    let subtotalMateriales = this.updateSubTotalMat();
    let total = subtotalMateriales;
    if (this.porcentaje > 0) {
      total += subtotalMateriales * (this.porcentaje / 100);
    }
    total += this.totalT;
    this.totalP = total;
    return total;
  }  

  updateSubtotalTrab(selectedTrabajador: any) {
    selectedTrabajador.horas = selectedTrabajador.form.get('horas').value;
    selectedTrabajador.precioHora = selectedTrabajador.form.get('precioHora').value;
    selectedTrabajador.subtotal = selectedTrabajador.horas * selectedTrabajador.precioHora;
    this.totalT = this.calcularTrabajador();
    this.total = this.totalM + this.totalT;
  }

}