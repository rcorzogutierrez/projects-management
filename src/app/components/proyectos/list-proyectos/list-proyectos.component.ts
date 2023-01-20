import { Component, OnInit } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore/firestore';
//
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styleUrls: ['./list-proyectos.component.css'],
})
export class ListProyectosComponent implements OnInit {
  projects: any[] = [];
  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    const clientId = '0TYkv0jIVRMyPagqI3d3';
    const docRef = this.firestore
      .collection('proyectos')

      .valueChanges()
      .subscribe(console.log);

    this.firestore
      .collection('clientes')
      .doc(clientId)
      .collection('proyectos')
      .valueChanges()
      .subscribe((projects) => {
        //console.log(this.projects);
        this.projects = projects;
      });
  }
}
