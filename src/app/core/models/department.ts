import {Employee} from "./employee";

export class Department{
  id: string;
  name: string;
  managerId: string;
  employees: Array<Employee>;
  budget: number;

  constructor(id: string, name: string, managerId: string, employees: Array<Employee>) {
    this.name = name;
    this.managerId = managerId;
    this.employees = employees;
    this.id = id;
    this.budget = parseInt("" + Math.random() * 1000000)
  }
}
