import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, forkJoin, mergeMap, switchMap } from 'rxjs';
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
                return proyectosSnapshot.docs.map((proyectoDoc) => {
                  const proyecto = proyectoDoc.data();
                  const id = proyectoDoc.id; // Agregamos la propiedad 'id' al objeto 'proyecto'
                  const fila: FilaTabla = {
                    mostrarDetalles: false,
                    cliente: clienteDoc.data().nombre,
                    proyectos: {
                      id: id, // Asignamos el valor del ID a la propiedad 'id' del objeto 'proyecto'
                      clientSelect: proyecto.clientSelect,
                      categoria: proyecto.categoria,
                      fechaInicio: proyecto.fechaInicio,
                      fechaFin: proyecto.fechaFin,
                      subTotalMat: proyecto.subTotalMat,
                      subtotalTrabajadores: proyecto.subtotalTrabajadores,
                      projecType: proyecto.projecType,
                      totalProyecto: proyecto.totalProyecto,
                      materials: proyecto.materials,
                      trabajadores: proyecto.trabajadores
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
        const filas = filasPorCliente.flat();
        console.log(filas); // Agregamos un console.log para ver los resultados en la consola
        return filas;
      })
    );
  }
  
  

}
