import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';
import { CreateMaterialesComponent } from './components/materiales/create-materiales/create-materiales.component';
import { ListMaterialesComponent } from './components/materiales/list-materiales/list-materiales.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-clientes', pathMatch: 'full' },
  { path: 'list-clientes', component: ListClientesComponent },
  { path: 'create-clientes', component: CreateClientesComponent },
  { path: 'edit-cliente/:id', component: CreateClientesComponent },
  { path: 'list-materiales', component: ListMaterialesComponent },
  { path: 'create-materiales', component: CreateMaterialesComponent },
  { path: 'edit-materiales/:id', component: CreateMaterialesComponent },
  { path: '**', redirectTo: 'list-clientes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
