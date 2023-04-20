import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeActionComponent } from './componenets/employee-action/employee-action.component';
import { EmployeesComponent } from './componenets/employees/employees.component';
import { HomeComponent } from './componenets/home/home.component';

const routes: Routes = [
  { path: '',   component: HomeComponent },
  { path: 'home',   component: HomeComponent },
  { path: 'employees',   component: EmployeesComponent },
  { path: 'employee-actions',   component: EmployeeActionComponent },
  {path: 'employees/:roleId', component: EmployeesComponent },
  {path: 'employee-actions/:empId', component: EmployeeActionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
