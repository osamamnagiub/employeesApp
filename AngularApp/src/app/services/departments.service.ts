import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';

@Injectable()
export class DepartmentsService {
  baseUrl = "/api/departments";

  constructor(private http: HttpClient) {}

  getAllDepartments() {
    return this.http.get<Department[]>(this.baseUrl);
  }

  addDepartment(department) {
    return this.http.post(this.baseUrl, department);
  }

  deleteDepartment(id: number) {
    var url = this.baseUrl + "/" + id;
    return this.http.delete(url);
  }
}
