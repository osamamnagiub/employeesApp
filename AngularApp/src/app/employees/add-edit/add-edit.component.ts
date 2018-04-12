import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { isNumber } from "util";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import * as moment from 'moment';

import { Employee } from "../../models/employee";
import { DepartmentsService } from "../../services/departments.service";
import { Department } from "../../models/department";
import { EmployeesService } from "../../services/employees.service";

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.css"]
})
export class AddEditComponent implements OnInit {

  employee = new Employee();
  employeeForm: FormGroup;
  departments: Department[];

  constructor(
    private fb: FormBuilder,
    private dpService: DepartmentsService,
    private employeeService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
  ) {
    this.employeeForm = this.fb.group({
      id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      departmentId: ""
    });
  }

  ngOnInit() {
    this.loadDepartments();

    this.activatedRoute.params.subscribe(params => {
      var id = +params["id"];
      if (id) {
        this.employeeService.getEmployee(id).subscribe(result => {
          this.fillForm(result);
        });
      } else {
        this.employeeForm.reset({
          id : 0
        });
      }
    });
  }

  loadDepartments() {
    this.dpService
      .getAllDepartments()
      .subscribe(result => (this.departments = result));
  }

  fillForm(employee: Employee) {
    var birthDate = moment(employee.dateOfBirth).format("YYYY-MM-DD");
    this.employeeForm.controls.id.setValue(employee.id);
    this.employeeForm.controls.firstName.setValue(employee.firstName);
    this.employeeForm.controls.lastName.setValue(employee.lastName);
    this.employeeForm.controls.dateOfBirth.setValue(birthDate);
    this.employeeForm.controls.departmentId.setValue(employee.departmentId);
  }

  onSave() {
    this.employeeService
      .addEmployee(this.employeeForm.value)
      .subscribe((result: HttpResponse<any>) => {
       
        if (result.status == 200) {
          this.router.navigate(["employees"]);
        }
      });
  }
}
