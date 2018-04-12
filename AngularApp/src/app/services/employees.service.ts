import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/employee";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EmployeesService {
  baseUrl = "/api/employees";

  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployee(id: number) {
    var url = this.baseUrl + "/" + id;
    return this.http.get<Employee>(url);
  }

  addEmployee(employee) {
    return this.http.post(this.baseUrl, employee, { observe: 'response'});
  }

  deleteEmployee(id: number) {
    var url = this.baseUrl + "/" + id;
    return this.http.delete(url);
  }

  searchEmployees(term){
    return this.http.get<Employee[]>(this.baseUrl + '/search/'+ term);
  }
}
