import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TrabajadoresService {
  constructor(private firestore: AngularFirestore) {}

  agregarTrabajadores(material: any): Promise<any> {
    return this.firestore.collection('trabajadores').add(material);
  }

  getTrabajadores(): Observable<any> {
    return this.firestore.collection('trabajadores').snapshotChanges();
  }

  eliminarTrabajador(id: string): Promise<any> {
    return this.firestore.collection('trabajadores').doc(id).delete();
  }

  getTrabajador(id: string): Observable<any> {
    return this.firestore.collection('trabajadores').doc(id).snapshotChanges();
  }

  actualizarTrabajador(id: string, data: any): Promise<any> {
    return this.firestore.collection('trabajadores').doc(id).update(data);
  }
}
