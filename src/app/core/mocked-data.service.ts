import {Injectable} from '@angular/core';
import {Organization} from "./models/organization";
import {Employee} from "./models/employee";
import {Department} from "./models/department";
import {BehaviorSubject, debounceTime, filter, interval, map, Observable, switchMap, throttle} from "rxjs";
import {isNotUndefined} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class MockedDataService {
  private dataSource = new BehaviorSubject<Array<Organization>>([])

  private data$ = this.dataSource.pipe(
    debounceTime(500), // simulating loading wait time.
    map(data => <Array<Organization>>JSON.parse(JSON.stringify(data)))
  );

  constructor() {
    this.dataSource.next(this.buildMockedData());
  }

  private buildMockedData(): Array<Organization> {
    const johnDoe = new Employee("fe297c97-13dc-44e5-b47a-b3f844698096", "John", "Doe")
    const janeDoe = new Employee("58d62c50-3d2a-44ae-bf1c-59f63339cdf2", "Jane", "Doe")
    const johnnyDoe = new Employee("8d698374-465d-4685-9fbb-31aa61e62738", "Johnny", "Doe");
    const jackDoe = new Employee("32747bca-a63c-4a6c-a4c3-2b37e8dbadad", "Jack", "Doe");
    const jamesDoe = new Employee("aa27bf64-af9e-4f3a-ad1a-aafcf72dff83", "James", "Doe");
    const jenniferDoe = new Employee("", "Jennifer", "Doe");
    const doeITDepartment = new Department("7b4d4903-f01e-40e6-b936-981a0e211e92", "IT", johnDoe.id, [johnDoe, janeDoe, johnnyDoe]);
    const doeFinanceDepartment = new Department("28658f9b-092c-4cb4-af22-e242b761d894", "Finance", jenniferDoe.id, [jenniferDoe, jackDoe, jamesDoe]);
    const doeCorp = new Organization("38319516-6ccd-4be8-8fbc-104f41862f99", "Doe Corp", [doeITDepartment, doeFinanceDepartment]);

    const johnSmith = new Employee("2d049d9e-66e8-4bae-97bb-7c5dc45770a5", "John", "Smith")
    const janeSmith = new Employee("46d6acfa-eb73-4989-8b8e-88b435905c6f", "Jane", "Smith")
    const johnnySmith = new Employee("89196233-8663-4363-8544-f69c1a665559", "Johnny", "Smith");
    const jackSmith = new Employee("f76cda18-eba1-4ce7-a8a1-a90aee439795", "Jack", "Smith");
    const jamesSmith = new Employee("296d3c06-1ce7-4dec-b938-e0c68641a6cb", "James", "Smith");
    const jenniferSmith = new Employee("27a1ac65-2617-47d1-bcf3-863e12b02860", "Jennifer", "Smith");
    const smithProductionDepartment = new Department("725e6e39-5842-49ef-8ab1-2ca53a3519a2", "Production", johnSmith.id, [johnSmith, janeSmith, johnnySmith]);
    const smithDeliveryDepartment = new Department("11deed93-b982-482f-beff-8f50ad79d5eb", "Delivery", jenniferSmith.id, [jenniferSmith, jackSmith, jamesSmith]);
    const smithCorp = new Organization("663aca5b-0c84-43e2-8495-a66a5c395f57", "Smith Corp", [smithProductionDepartment, smithDeliveryDepartment]);

    return [doeCorp, smithCorp];
  }

  getOrganizations$(): Observable<Array<Organization>> {
    return this.data$;
  }

  getOrganization$(id$: Observable<string>): Observable<Organization> {
    return id$
      .pipe(
        switchMap(id => this.data$
          .pipe(
            map(organizations => organizations.find(organization => organization.id === id))
          ),
        ),
        filter(isNotUndefined)
      )
  }

  searchOrganizations$(filter$: Observable<string>): Observable<Array<Organization>> {
    return filter$
      .pipe(
        switchMap(f => this.data$
          .pipe(
            map(organizations => organizations.filter(organization => !f || organization.name.toLocaleLowerCase().includes(f.toLocaleLowerCase()))),
          ),
        )
      )
  }

  getDepartments$(organizationId$: Observable<string>): Observable<Array<Department>> {
    return this.getOrganization$(organizationId$)
      .pipe(
        map(organization => organization.departments)
      );
  }

  getDepartment$(organizationId$: Observable<string>, id$: Observable<string>): Observable<Department> {
    return id$.pipe(
      switchMap(id => this.getDepartments$(organizationId$)
        .pipe(
          map(departments => departments.find(department => department.id === id))
        ),
      ),
      filter(isNotUndefined),
    )
  }

  saveDepartment$(organizationId: string, department: Department): void {
    const data = <Array<Organization>>JSON.parse(JSON.stringify(this.dataSource.getValue()))
    const organization = data.find(organization => organization.id == organizationId)
    if (null == organization) {
      throw Error("organization not found.");
    }
    const departmentIndex = organization.departments.findIndex(dep => dep.id === department.id);
    organization.departments[departmentIndex] = department;
    this.dataSource.next(data);

  }

  searchDepartments$(organizationId$: Observable<string>, filter$: Observable<string>): Observable<Array<Department>> {
    return filter$
      .pipe(
        switchMap(f => this.getDepartments$(organizationId$)
          .pipe(
            map(departments => departments.filter(department => department.name.toLocaleLowerCase().includes(f.toLocaleLowerCase()))),
          )
        )
      );
  }

  getEmployees$(organizationId$: Observable<string>, departmentId$: Observable<string>): Observable<Array<Employee>> {
    return this.getDepartment$(organizationId$, departmentId$)
      .pipe(
        map(department => department.employees)
      )
  }

  getEmployee$(organizationId$: Observable<string>, departmentId$: Observable<string>, id$: Observable<string>): Observable<Employee> {
    return id$.pipe(
      switchMap(id => this.getEmployees$(organizationId$, departmentId$)
        .pipe(
          map(employees => employees.find(employee => employee.id === id))
        ),
      ),
      filter(isNotUndefined),
    )
  }

  searchEmployees$(organizationId$: Observable<string>, departmentId$: Observable<string>, filter$: Observable<string>): Observable<Array<Employee>> {
    return filter$
      .pipe(
        switchMap(f => this.getEmployees$(organizationId$, departmentId$)
          .pipe(
            map(employees => employees.filter(employee =>
              employee.firstName.toLocaleLowerCase().includes(f.toLocaleLowerCase())
              || employee.lastName.toLocaleLowerCase().includes(f.toLocaleLowerCase())
            )),
          )
        )
      );
  }
}
