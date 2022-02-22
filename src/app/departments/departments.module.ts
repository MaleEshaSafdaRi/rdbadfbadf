import {NgModule} from '@angular/core';
import {DepartmentsListComponent} from './departments-list/departments-list.component';
import {DepartmentDetailsComponent} from './department-details/department-details.component';
import {SharedModule} from "../shared/shared.module";
import { DepartmentEditorComponent } from './department-editor/department-editor.component';


@NgModule({
  declarations: [
    DepartmentsListComponent,
    DepartmentDetailsComponent,
    DepartmentEditorComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class DepartmentsModule { }
