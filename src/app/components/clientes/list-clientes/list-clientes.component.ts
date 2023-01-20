import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
//import { map, Observable } from 'rxjs';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css'],
})
export class ListClientesComponent {
  clientes: any[] = [];
  projects: any[] = [];
  cliente: any[] = [];

  constructor(
    private _clienteService: ClientesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe((data) => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      //console.log(this.clientes);
    });
  }

  eliminarCliente(id: string) {
    this._clienteService.eliminarCliente(id).then(() => {
      console.log('eliminado');
      this.toastr.error(
        'El cliente fue eliminado con exito',
        'Cliente Eliminado',
        { positionClass: 'toast-top-right' }
      );
    });
  }

  getProyectos(id: string) {
    this._clienteService.getClienteProyectos(id).subscribe((data) => {
      this.projects = [];
      data.forEach((element: any) => {
        this.projects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      //console.log(this.clientes);
    });
  }
}
