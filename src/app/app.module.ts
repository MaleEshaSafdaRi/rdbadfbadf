import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {OrganizationsModule} from "./organizations/organizations.module";
import {DepartmentsModule} from "./departments/departments.module";
import {EmployeesModule} from "./employees/employees.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    OrganizationsModule,
    DepartmentsModule,
    EmployeesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
