import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css'],
})
export class CreateClientesComponent {
  createCliente: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Cliente';

  constructor(
    private fb: FormBuilder,
    private _clienteService: ClientesService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarCliente() {
    this.submitted = true;
    if (this.createCliente.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarCliente();
    } else {
      this.editarCliente(this.id);
    }
  }

  agregarCliente() {
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellidos: this.createCliente.value.apellidos,
      documento: this.createCliente.value.documento,
      salario: this.createCliente.value.salario,
      fechaCreacion: new Date(),
      fechaactualizacion: new Date(),
    };
    this.loading = true;
    this._clienteService
      .agregarClientes(cliente)
      .then(() => {
        this.toastr.success(
          'El cliente fue registrado con exito',
          'Cliente Registrado',
          { positionClass: 'toast-top-right' }
        );
        this.loading = false;
        this.router.navigate(['/list-clientes']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editarCliente(id: string) {
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellidos: this.createCliente.value.apellidos,
      documento: this.createCliente.value.documento,
      salario: this.createCliente.value.salario,
      fechaactualizacion: new Date(),
    };
    this.loading = true;
    this._clienteService.actualizarCliente(id, cliente).then(() => {
      this.loading = false;
      this.toastr.info(
        'el cliente fue modificado con exito',
        'Cliente Registrado',
        { positionClass: 'toast-top-right' }
      );
      this.router.navigate(['/list-clientes']);
    });
  }

  esEditar() {
    this.titulo = 'Editar Cliente';
    if (this.id !== null) {
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createCliente.setValue({
          nombre: data.payload.data()['nombre'],
          apellidos: data.payload.data()['apellidos'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }
}
