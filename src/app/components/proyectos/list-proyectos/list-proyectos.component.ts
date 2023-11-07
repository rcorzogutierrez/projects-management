import { Component } from '@angular/core';
import { ProyectosService } from '../../../services/proyectos.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilaTabla, Project } from '../../../interfaces/project';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styleUrls: ['./list-proyectos.component.css']
})
export class ListProyectosComponent {
  proyectos: any[] = [];
  proyectosClientes: any[] = [];
  isLoading = false;
  proyectosSubscription!: Subscription;
  filasTabla: FilaTabla[] = [];

  constructor(
    private proyectosService: ProyectosService, 
    private firestore: AngularFirestore,
    private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.proyectosService.obtenerFilasTabla().subscribe(filasTabla => {
      this.filasTabla = filasTabla;
      console.log(filasTabla);
    });
  }

  eliminarProyecto(clienteId: string, proyectoId: string): Promise<void> {
    const proyectosRef = this.firestore.collection<Project>('clientes').doc(clienteId).collection<Project>('proyectos');
    return proyectosRef.doc(proyectoId).delete().then(() => {
      this.proyectosService.obtenerFilasTabla().subscribe(filasTabla => {
        this.filasTabla = filasTabla;
        this.toastr.error('Se ha eliminado exitosamente el proyecto', 'Proyecto Borrado')
      });
    });
  }

}
