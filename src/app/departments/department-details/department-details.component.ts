import {Component, OnInit} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {isNotNull} from "../../core/utils";
import {Department} from "../../core/models/department";

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  readonly department$: Observable<Department>;
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
    this.department$ = dataService.getDepartment$(organizationId$, departmentId$);
  }

  ngOnInit(): void {
  }

}
