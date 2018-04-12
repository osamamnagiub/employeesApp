import { Department } from "./department";

export class Employee {
  public id;
  public firstName;
  public lastName;
  public dateOfBirth;
  public departmentId;
  public department: Department;

  constructor() {}
}
