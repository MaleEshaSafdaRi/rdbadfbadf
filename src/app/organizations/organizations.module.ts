import {NgModule} from '@angular/core';
import {OrganizationListComponent} from './organization-list/organization-list.component';
import {OrganizationDetailsComponent} from './organization-details/organization-details.component';
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class OrganizationsModule { }
