import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, forkJoin, mergeMap } from 'rxjs';
import { FilaTabla, } from '../interfaces/project';
import { Cliente } from '../interfaces/clientes';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private firestore: AngularFirestore) { }

  createProject(proyecto: any, idcliente: string) {
    const projectRef = this.firestore.collection('clientes').doc(idcliente).collection('proyectos');
    return projectRef.add(proyecto);
  }
 
  obtenerFilasTabla(): Observable<FilaTabla[]> {
    const clientesRef = this.firestore.collection<Cliente>('clientes');
    const proyectosPorCliente$ = clientesRef.get().pipe(
      mergeMap((clientesSnapshot) => {
        return forkJoin(
          clientesSnapshot.docs.map((clienteDoc) => {
            const clienteId = clienteDoc.id;
            const proyectosRef = this.firestore.collection<Project>('clientes').doc(clienteId).collection<Project>('proyectos');
            return proyectosRef.get().pipe(
              map((proyectosSnapshot) => {
                //console.log('proyectosSnapshot:', proyectosSnapshot); // Agrega este console.log() para depurar
                return proyectosSnapshot.docs.map((proyectoDoc) => {
                  const proyecto = proyectoDoc.data();
                  //console.log('proyecto:', proyecto); // Agrega este console.log() para depurar
                  const fila: FilaTabla = {
                    cliente: clienteDoc.data().nombre,
                    proyectos: {
                      clientSelect:proyecto.clientSelect,
                      categoria:proyecto.categoria,
                      fechaInicio:proyecto.fechaInicio,
                      fechaFin:proyecto.fechaFin,
                      subTotalMat:proyecto.subTotalMat,
                      subtotalTrabajadores:proyecto.subtotalTrabajadores,
                      projecType:proyecto.projecType,
                      totalProyecto:proyecto.totalProyecto,
                      materials:proyecto.materials,
                      trabajadores:proyecto.trabajadores
                    }
                  };
                  return fila;
                });
              })
            );
          })
        );
      })
    );
    return proyectosPorCliente$.pipe(
      map((filasPorCliente) => {
        return filasPorCliente.flat();
      })
    );
  }

}
