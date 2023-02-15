import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private firestore: AngularFirestore) { }

  createProject(proyecto: any, idcliente: string) {
    const projectRef = this.firestore.collection('clientes').doc(idcliente).collection('proyectos');
    return projectRef.add(proyecto);
  }
}
