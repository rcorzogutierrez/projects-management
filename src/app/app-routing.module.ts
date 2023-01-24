import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';
import { CreateMaterialesComponent } from './components/materiales/create-materiales/create-materiales.component';
import { ListMaterialesComponent } from './components/materiales/list-materiales/list-materiales.component';
import { CreateTrabajadoresComponent } from './components/trabajadores/create-trabajadores/create-trabajadores.component';
import { ListTrabajadoresComponent } from './components/trabajadores/list-trabajadores/list-trabajadores.component';
import { CreateProyectosComponent } from './components/proyectos/create-proyectos/create-proyectos.component';


const routes: Routes = [
  { path: '', redirectTo: 'list-clientes', pathMatch: 'full' },
  { path: 'list-clientes', component: ListClientesComponent },
  { path: 'create-clientes', component: CreateClientesComponent },
  { path: 'edit-cliente/:id', component: CreateClientesComponent },
  { path: 'list-materiales', component: ListMaterialesComponent },
  { path: 'create-materiales', component: CreateMaterialesComponent },
  { path: 'edit-material/:id', component: CreateMaterialesComponent },
  { path: 'list-trabajadores', component: ListTrabajadoresComponent },
  { path: 'create-trabajadores', component: CreateTrabajadoresComponent },
  { path: 'create-proyectos', component: CreateProyectosComponent },
  { path: 'edit-trabajador/:id', component: CreateTrabajadoresComponent },
  { path: '**', redirectTo: 'list-clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
