import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {isNotNull} from "../../core/utils";
import {Employee} from "../../core/models/employee";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  readonly employee$: Observable<Employee>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: MockedDataService) {
    const organizationId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("organizationId")),
        filter(isNotNull),
      )
    const departmentId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("departmentId")),
        filter(isNotNull),
      )
    const employeeId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("employeeId")),
        filter(isNotNull),
      )
    this.employee$ = dataService.getEmployee$(organizationId$, departmentId$, employeeId$);
  }

  ngOnInit(): void {
  }

}
