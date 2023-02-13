import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private firestore: AngularFirestore) { }

  createProject(data:any,id: string) {
    return this.firestore.collection('clientes').doc(id)
    .collection('proyectos').add(data);
  }
}
