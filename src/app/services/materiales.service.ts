import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MaterialesService {
  constructor(private firestore: AngularFirestore) {}

  agregarMateriales(material: any): Promise<any> {
    return this.firestore.collection('materiales').add(material);
  }

  getMateriales(): Observable<any> {
    return this.firestore.collection('materiales').snapshotChanges();
  }

  eliminarMaterial(id: string): Promise<any> {
    return this.firestore.collection('materiales').doc(id).delete();
  }

  getMaterial(id: string): Observable<any> {
    return this.firestore.collection('materiales').doc(id).snapshotChanges();
  }

  actualizarMaterial(id: string, data: any): Promise<any> {
    return this.firestore.collection('materiales').doc(id).update(data);
  }
}
