import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-create-clientes',
  templateUrl: './create-clientes.component.html',
  styleUrls: ['./create-clientes.component.css']
})
export class CreateClientesComponent {
  createCliente: FormGroup;
  submitted = false;
  loading = false;

  constructor(private fb: FormBuilder, private _clienteService: ClientesService, private router: Router, private toastr: ToastrService) {
    this.createCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
  }
  ngOnInit(): void { }

  agregarCliente(): void {
    this.submitted = true;
    if (this.createCliente.invalid) {
      return;
    }
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellidos: this.createCliente.value.apellidos,
      documento: this.createCliente.value.documento,
      salario: this.createCliente.value.salario,
      fechaCreacion: new Date(),
      fechaactualizacion: new Date()

    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() => {
      this.toastr.success('El cliente fue registrado con exito', 'Cliente Registrado', { positionClass: 'toast-top-right' });
      this.loading = false
      this.router.navigate(['/list-clientes'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })

  }

}
