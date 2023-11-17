import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientesComponent } from './components/clientes/list-clientes/list-clientes.component';
import { CreateClientesComponent } from './components/clientes/create-clientes/create-clientes.component';
import { CreateMaterialesComponent } from './components/materiales/create-materiales/create-materiales.component';
import { ListMaterialesComponent } from './components/materiales/list-materiales/list-materiales.component';
import { CreateTrabajadoresComponent } from './components/trabajadores/create-trabajadores/create-trabajadores.component';
import { ListTrabajadoresComponent } from './components/trabajadores/list-trabajadores/list-trabajadores.component';
import { CreateProyectosComponent } from './components/proyectos/create-proyectos/create-proyectos.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ListProyectosComponent } from './components/proyectos/list-proyectos/list-proyectos.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'list-clientes', component: ListClientesComponent, canActivate: [AuthGuard] },
  { path: 'create-clientes', component: CreateClientesComponent, canActivate: [AuthGuard] },
  { path: 'edit-cliente/:id', component: CreateClientesComponent, canActivate: [AuthGuard] },
  { path: 'list-materiales', component: ListMaterialesComponent, canActivate: [AuthGuard] },
  { path: 'create-materiales', component: CreateMaterialesComponent, canActivate: [AuthGuard] },
  { path: 'edit-material/:id', component: CreateMaterialesComponent, canActivate: [AuthGuard] },
  { path: 'list-trabajadores', component: ListTrabajadoresComponent, canActivate: [AuthGuard] },
  { path: 'create-trabajadores', component: CreateTrabajadoresComponent, canActivate: [AuthGuard] },
  { path: 'create-proyectos', component: CreateProyectosComponent, canActivate: [AuthGuard] },
  { path: 'list-proyectos', component:ListProyectosComponent,canActivate:[AuthGuard]},
  { path: 'edit-proyecto/:id', component: CreateProyectosComponent, canActivate: [AuthGuard] },
  { path: 'edit-trabajador/:id', component: CreateTrabajadoresComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
