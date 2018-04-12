import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";

import { EmployeesService } from "../../services/employees.service";
import { Employee } from "../../models/employee";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "app-employees-list",
  templateUrl: "./employees-list.component.html",
  styleUrls: ["./employees-list.component.css"]
})
export class EmployeesListComponent implements OnInit {
  data: any = [];
  displayDialog: boolean = false;
  selectedEmployee: any;
  employee: any;
  searchMode : boolean;
  searchTerm$ = new Subject<string>();
  
  constructor(
    private employeesService: EmployeesService,
    private confirmationService: ConfirmationService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(params => {
      this.searchMode = params.searchMode ;
    });

    this.reloadData();

    this.searchTerm$.debounceTime(200)
                    .distinctUntilChanged()
                    .switchMap(term => this.employeesService.searchEmployees(term))
                    .subscribe(results => this.data = results);

  }

  onRowSelect(event) {
    console.log(event);
  }

  deleteEmployee(employee: Employee) {
    console.log(employee)
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
          this.employeesService.deleteEmployee(employee.id)
                                .subscribe(r => this.reloadData())
      },
      reject: () => {
          
      }
  });
  }


  reloadData(){
    this.employeesService
      .getAllEmployees()
      .subscribe(result => (this.data = result));
  }
}
