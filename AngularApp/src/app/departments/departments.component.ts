import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Department } from "../models/department";
import { DepartmentsService } from "../services/departments.service";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"]
})
export class DepartmentsComponent implements OnInit {
  departmentsForm: FormGroup;
  departments: Department[];

  constructor(private fb: FormBuilder, private dpService: DepartmentsService) {
    this.departmentsForm = this.fb.group({
      id: 0,
      name: ["" , Validators.required]
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  onSave() {
    this.dpService
      .addDepartment(this.departmentsForm.value)
      .subscribe((result: HttpResponse<any>) => {
        this.reloadData();
      });
  }

  reloadData(): any {
    this.dpService
      .getAllDepartments()
      .subscribe(result => (this.departments = result));
  }
}
