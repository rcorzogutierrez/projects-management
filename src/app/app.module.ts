import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';

import { ToastrModule } from 'ngx-toastr';

import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateMaterialesComponent } from './components/materiales/create-materiales/create-materiales.component';
import { ListMaterialesComponent } from './components/materiales/list-materiales/list-materiales.component';
import { MaterialesService } from './services/materiales.service';
import { FilterPipe } from './pipes/filter.pipe';
import { CreateTrabajadoresComponent } from './components/trabajadores/create-trabajadores/create-trabajadores.component';
import { ListTrabajadoresComponent } from './components/trabajadores/list-trabajadores/list-trabajadores.component';
import { TrabajadoresService } from './services/trabajadores.service';


@NgModule({
  declarations: [
    AppComponent,
    ListClientesComponent,
    CreateClientesComponent,
    CreateMaterialesComponent,
    ListMaterialesComponent,  
    NavbarComponent,
    FilterPipe,
    CreateTrabajadoresComponent,
    ListTrabajadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [MaterialesService,TrabajadoresService],
  bootstrap: [AppComponent],
})
export class AppModule {}
