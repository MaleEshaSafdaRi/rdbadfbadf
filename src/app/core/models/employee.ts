export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  hiredDate: number;
  age: number;
  salary: number;

  constructor(id: string, firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.hiredDate = Date.now()
    this.age = parseInt("" + Math.random() * 100)
    this.salary = parseInt("" + Math.random() * 10000)
  }
}
