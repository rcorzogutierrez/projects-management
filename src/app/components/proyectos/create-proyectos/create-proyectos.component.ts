import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {
  form: FormGroup;
  clients: any[] = [];

  constructor(
    private _clienteService: ClientesService,
    private formBuilder: FormBuilder){ 
      this.form = this.formBuilder.group({});}

    ngOnInit() {
      this.clients = [];
      this.form = this.formBuilder.group({
        clientSelect: ['']
      });

      this._clienteService.getClientes().subscribe(data => {
        this.clients = data.map((element: any) => {
          return {
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          };
        });
      });
    }
}

