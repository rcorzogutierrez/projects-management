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
  cliente ='';
  display=true;

  constructor(
    private _clienteService: ClientesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.display = true;
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

  reloadCurrentPage() {
    this.display = true;
    this.projects = [];
    //window.location.reload();
   }

  getProyectos(id: string, nombre:string) {
   this.cliente = nombre;
   //this.display = false;
    this._clienteService.getClienteProyectos(id).subscribe((data) => {
      //
      this.projects = [];
      
      data.forEach((element: any) => {
        this.projects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
        if (this.projects.length == 0) {this.display = true;}else{this.display = false;}
        //console.log(this.projects.length)
      });
      //console.log(this.clientes);
    });
  }
}
