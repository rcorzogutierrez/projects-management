import { ChangeDetectorRef, Component } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilaTabla, Project } from '../../../interfaces/project';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/services/modal.service';

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
  detallesFila: FilaTabla | undefined;
  detallesMostrados = false;
  filaDetalles: FilaTabla | null = null;
  bodyText = 'This text can be updated in modal 1';

  constructor(
    private proyectosService: ProyectosService, 
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    protected modalService: ModalService,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {   
    this.proyectosService.obtenerFilasTabla().subscribe(filasTabla => {
      this.filasTabla = filasTabla;
      //console.log(filasTabla);
      this.cdRef.detectChanges(); // agregar esta línea para actualizar la vista
    });
  }
  
  eliminarProyecto(clienteId: string, proyectoId: string): Promise<void> {
    const proyectosRef = this.firestore.collection<Project>('clientes').doc(clienteId).collection<Project>('proyectos');
    return proyectosRef.doc(proyectoId).delete().then(() => {
        this.proyectosService.obtenerFilasTabla().subscribe(filasTabla => {
            this.filasTabla = filasTabla;
            this.toastr.error('Se ha eliminado exitosamente el proyecto', 'Proyecto Borrado');
            this.cdRef.detectChanges(); // mueve esto aquí para actualizar la tabla solo después de recibir la respuesta del servidor
        });
    });
}
  mostrarDetalles(fila: any) {
    console.log('Fila seleccionada:', fila);
    this.filaDetalles = fila;
    this.detallesFila = fila;
    this.modalService.open('modal-1');
    this.detallesMostrados = true;
    this.cdRef.detectChanges(); // agregar esta línea para actualizar la vista
  }  
  ocultarDetalles(): void {
    this.detallesFila = undefined;
    this.detallesMostrados = false;
    this.cdRef.detectChanges(); // agregar esta línea para actualizar la vista
  }
}

