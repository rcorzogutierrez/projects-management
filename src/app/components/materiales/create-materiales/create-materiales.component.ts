import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialesService } from '../../../services/materiales.service';

@Component({
  selector: 'app-create-materiales',
  templateUrl: './create-materiales.component.html',
  styleUrls: ['./create-materiales.component.css'],
})
export class CreateMaterialesComponent implements OnInit {
  createMaterial: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Material';
  constructor(
    private fb: FormBuilder,
    private _materialService: MaterialesService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createMaterial = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
    this.esEditar();
  }

  agregarEditarMaterial() {
    this.submitted = true;
    if (this.createMaterial.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarMaterial();
    } else {
      this.editarMaterial(this.id);
    }
  }

  agregarMaterial() {
    const material: any = {
      nombre: this.createMaterial.value.nombre,
      descripcion: this.createMaterial.value.descripcion,
      precio: this.createMaterial.value.precio,
    };
    this.loading = true;
    this._materialService
      .agregarMateriales(material)
      .then(() => {
        this.toastr.success(
          'El cliente fue registrado con exito',
          'Cliente Registrado',
          { positionClass: 'toast-top-right' }
        );
        this.loading = false;
        this.router.navigate(['/list-materiales']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editarMaterial(id: string) {
    const material: any = {
      nombre: this.createMaterial.value.nombre,
      descripcion: this.createMaterial.value.descripcion,
      precio: this.createMaterial.value.precio,
    };
    this.loading = true;
    this._materialService.actualizarMaterial(id, material).then(() => {
      this.loading = false;
      this.toastr.info(
        'el material fue modificado con exito',
        'Material Registrado',
        { positionClass: 'toast-top-right' }
      );
      this.router.navigate(['/list-materiales']);
    });
  }

  esEditar() {
    this.titulo = 'Editar Material';
    if (this.id !== null) {
      this.loading = true;
      this._materialService.getMaterial(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createMaterial.setValue({
          nombre: data.payload.data()['nombre'],
          descripcion: data.payload.data()['descripcion'],
          precio: data.payload.data()['precio'],
        });
      });
    }
  }
}
