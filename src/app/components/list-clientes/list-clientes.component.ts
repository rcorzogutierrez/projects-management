import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-clientes',
  templateUrl: './list-clientes.component.html',
  styleUrls: ['./list-clientes.component.css']
})
export class ListClientesComponent{
  items:Observable<any[]>;
  
  constructor(firestore:AngularFirestore){
    this.items = firestore.collection('items').valueChanges();
   
  }
  

}
