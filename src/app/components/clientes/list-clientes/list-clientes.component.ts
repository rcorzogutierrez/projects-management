import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css'],
})
export class ListClientesComponent {
  clientes: any[] = [];
  projects: any[] = [];
  matprojects: any[] = [];
  cliente ='';
  proyecto ='';
  display=true;
  idcliente=''

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
   }

  getProyectos(id: string, nombre:string) {
   this.cliente = nombre;
   this.idcliente = id;
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

  getconsole(id: string, idp:string){
    console.log(id, idp)
  }

  getMatProyecto(idp:string, nproyecto:string){
    this.proyecto= nproyecto;
   const id = this.idcliente
    this._clienteService.getClienteProyectoMateriales(id,idp).subscribe((data)=>{
      this.matprojects = [];
      data.forEach((element:any)=>{
        this.matprojects.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })

  }
}
