import {Department} from "./department";

export class Organization {
  id: string;
  name: string;
  departments: Array<Department>;

  constructor(id: string, name: string, departments: Array<Department>) {
    this.name = name;
    this.departments = departments;
    this.id = id;
  }
}
