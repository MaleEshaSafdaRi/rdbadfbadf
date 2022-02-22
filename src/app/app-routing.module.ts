import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationListComponent} from "./organizations/organization-list/organization-list.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {OrganizationDetailsComponent} from "./organizations/organization-details/organization-details.component";
import {DepartmentDetailsComponent} from "./departments/department-details/department-details.component";
import {DepartmentsListComponent} from "./departments/departments-list/departments-list.component";
import {EmployeesListComponent} from "./employees/employees-list/employees-list.component";
import {EmployeeDetailsComponent} from "./employees/employee-details/employee-details.component";
import {DepartmentEditorComponent} from "./departments/department-editor/department-editor.component";

const routes: Routes = [{
  path: "",
  component: OrganizationListComponent
}, {
  path: ":organizationId",
  component: OrganizationDetailsComponent,
}, {
  path: ":organizationId/departments",
  component: DepartmentsListComponent,
}, {
  path: ":organizationId/departments/:departmentId",
  component: DepartmentDetailsComponent,
}, {
  path: ":organizationId/departments/:departmentId/edit",
  component: DepartmentEditorComponent,
}, {
  path: ":organizationId/departments/:departmentId/employees",
  component: EmployeesListComponent,
}, {
  path: ":organizationId/departments/:departmentId/employes/:employeeId", // <-- there is a typo here.
  component: EmployeeDetailsComponent,
}, {
  path: "**",
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
