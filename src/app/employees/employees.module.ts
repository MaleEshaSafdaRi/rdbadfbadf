import {NgModule} from '@angular/core';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class EmployeesModule { }
