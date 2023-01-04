
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private firestore:AngularFirestore) { }

  agregarCliente(cliente:any):Promise<any>{
    return this.firestore.collection('clientes').add(cliente);
  }
}
