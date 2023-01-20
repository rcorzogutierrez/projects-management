import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
//import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}

  agregarClientes(cliente: any): Promise<any> {
    return this.firestore.collection('clientes').add(cliente);
  }

  getClientes(): Observable<any> {
    return this.firestore
      .collection('clientes', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }

  eliminarCliente(id: string): Promise<any> {
    return this.firestore.collection('clientes').doc(id).delete();
  }

  getCliente(id: string): Observable<any> {
    return this.firestore.collection('clientes').doc(id).snapshotChanges();
  }

  actualizarCliente(id: string, data: any): Promise<any> {
    return this.firestore.collection('clientes').doc(id).update(data);
  }

  getClienteProyectos(id: string) {
    return this.firestore
      .collection('clientes')
      .doc(id)
      .collection('proyectos')
      .snapshotChanges();
  }
}
