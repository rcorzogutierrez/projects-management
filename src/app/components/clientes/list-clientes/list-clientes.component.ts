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
  displayc=true;
  displayp=true;
  displaym=true;
  idcliente='';
  searchText: string = '';

  constructor(
    private _clienteService: ClientesService,
    private toastr: ToastrService
  ) {this.searchText = '';}

  ngOnInit() {
    this.getClientes(); 
  
  }

  getClientes() {
    this.displayc = true;
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
    this.displayc = true;
    this.projects = []; 
    this.matprojects = [];
   }

  getProyectos(id: string, nombre:string) {
   this.cliente = nombre;
   this.idcliente = id; 
    this._clienteService.getClienteProyectos(id).subscribe((data) => {

      this.projects = [];
      
      data.forEach((element: any) => {
        this.projects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
        if (this.projects.length == 0) {this.displayc = true;}else{this.displayc = false;}
        //console.log(this.projects.length)
      });
      //console.log(this.clientes);
    });
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
        });
        if (this.matprojects.length == 0) {this.displayp = true;}else{this.displayp = false;}
      })
    })

  }
  searchClient(event: KeyboardEvent) {
    if (event.target) {
      this.searchText = (event.target as HTMLInputElement).value;
  }
  }
}
