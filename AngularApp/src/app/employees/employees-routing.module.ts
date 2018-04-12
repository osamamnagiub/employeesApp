import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  {
    path: "employees",
    children: [
      { path: "", component: EmployeesListComponent },
      { path: "addEdit/:id", component: AddEditComponent },
      {
        path: "search",
        component: EmployeesListComponent,
        data: { searchMode: true }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
