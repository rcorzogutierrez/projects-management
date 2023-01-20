import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore/firestore';
//

import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styleUrls: ['./list-proyectos.component.css'],
})
export class ListProyectosComponent implements OnInit {
  projects: any[] = [];
  constructor(private _clienteService: ClientesService) {}

  ngOnInit() {}

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
