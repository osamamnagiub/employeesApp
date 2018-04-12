import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeesRoutingModule } from "./employees-routing.module";
import { EmployeesService } from "../services/employees.service";
import { EmployeesComponent } from "./employees.component";
import { EmployeesListComponent } from "./employees-list/employees-list.component";
import { AddEditComponent } from "./add-edit/add-edit.component";
import { ConfirmationService } from "primeng/api";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, EmployeesRoutingModule, SharedModule],
  declarations: [EmployeesComponent, EmployeesListComponent, AddEditComponent],
  providers: [EmployeesService, ConfirmationService]
})
export class EmployeesModule {}
