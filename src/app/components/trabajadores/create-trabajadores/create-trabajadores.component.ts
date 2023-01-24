import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrabajadoresService } from '../../../services/trabajadores.service';

@Component({
  selector: 'app-create-trabajadores',
  templateUrl: './create-trabajadores.component.html',
  styleUrls: ['./create-trabajadores.component.css']
})
export class CreateTrabajadoresComponent implements OnInit{
  createTrabajador: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Trabajador';

  constructor(
    private fb: FormBuilder,
    private _trabajadoresService: TrabajadoresService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createTrabajador = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      cargo: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
  }

  ngOnInit() {
    this.esEditar();
  }

  agregarEditarTrabajador() {
    this.submitted = true;
    if (this.createTrabajador.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarTrabajador();
    } else {
      this.editarTrabajador(this.id);
    }
  }

  agregarTrabajador() {
    const trabajador: any = {
      nombre: this.createTrabajador.value.nombre,
      apellidos: this.createTrabajador.value.apellidos,
      cargo: this.createTrabajador.value.cargo,
    };
    this.loading = true;
    this._trabajadoresService
      .agregarTrabajadores(trabajador)
      .then(() => {
        this.toastr.success(
          'El trabajador fue registrado con exito',
          'Trabajador Registrado',
          { positionClass: 'toast-top-right' }
        );
        this.loading = false;
        this.router.navigate(['/list-trabajadores']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editarTrabajador(id: string) {
    const trabajador: any = {
      nombre: this.createTrabajador.value.nombre,
      apellidos: this.createTrabajador.value.apellidos,
      cargo: this.createTrabajador.value.cargo,
    };
    this.loading = true;
    this._trabajadoresService.actualizarTrabajador(id, trabajador).then(() => {
      this.loading = false;
      this.toastr.info(
        'el trabajador fue modificado con exito',
        'Trabajador Registrado',
        { positionClass: 'toast-top-right' }
      );
      this.router.navigate(['/list-trabajadores']);
    });
  }

  esEditar() {
    this.titulo = 'Editar Trabajador';
    if (this.id !== null) {
      this.loading = true;
      this._trabajadoresService.getTrabajador(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createTrabajador.setValue({
          nombre: data.payload.data()['nombre'],
          apellidos: data.payload.data()['apellidos'],
          cargo: data.payload.data()['cargo'],
        });
      });
    }
  }

}







