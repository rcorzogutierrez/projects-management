import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrabajadoresService } from '../../../services/trabajadores.service';

@Component({
  selector: 'app-list-trabajadores',
  templateUrl: './list-trabajadores.component.html',
  styleUrls: ['./list-trabajadores.component.css']
})
export class ListTrabajadoresComponent implements OnInit {

  trabajadores: any[] = [];

  constructor(
    private _trabajadoresService: TrabajadoresService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTrabajadores();
  }

  getTrabajadores() {
    this._trabajadoresService.getTrabajadores().subscribe((data) => {
      this.trabajadores = [];
      data.forEach((element: any) => {
        this.trabajadores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.trabajadores);
    });
  }

  eliminarTrabajadores(id: string) {
    this._trabajadoresService.eliminarTrabajador(id).then(() => {
      //console.log('eliminado');
      this.toastr.error(
        'El trabajador fue eliminado con exito',
        'Trabajador Eliminado',
        { positionClass: 'toast-top-right' }
      );
    });
  }}


