import { Component } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilaTabla } from '../../../interfaces/project';

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
    private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.proyectosService.obtenerFilasTabla().subscribe(filasTabla => {
      console.log(filasTabla);
    });
  }

}
