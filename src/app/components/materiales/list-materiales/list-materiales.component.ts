import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MaterialesService } from '../../../services/materiales.service';

@Component({
  selector: 'app-list-materiales',
  templateUrl: './list-materiales.component.html',
  styleUrls: ['./list-materiales.component.css'],
})
export class ListMaterialesComponent implements OnInit {
  materiales: any[] = [];

  constructor(
    private _materialesService: MaterialesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getMateriales();
  }

  getMateriales() {
    this._materialesService.getMateriales().subscribe((data) => {
      this.materiales = [];
      data.forEach((element: any) => {
        this.materiales.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.materiales);
    });
  }

  eliminarMateriales(id: string) {
    this._materialesService.eliminarMaterial(id).then(() => {
      console.log('eliminado');
      this.toastr.error(
        'El material fue eliminado con exito',
        'Material Eliminado',
        { positionClass: 'toast-top-right' }
      );
    });
  }
}
