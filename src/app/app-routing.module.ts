import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadoComponent } from "./components/create-empleado/CreateEmpleadoComponent";
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  {path: '', component: ListEmpleadosComponent},
  {path: 'empleados', component: ListEmpleadosComponent},
  {path: 'create-empleados', component: CreateEmpleadoComponent},
  {path: 'edit-empleados', component: CreateEmpleadoComponent},
  {path: '**', redirectTo: 'empleados', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
