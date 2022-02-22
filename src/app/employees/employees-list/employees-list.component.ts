import {Component, OnInit} from '@angular/core';
import {debounceTime, filter, map, Observable, startWith, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {isNotNull} from "../../core/utils";
import {Employee} from "../../core/models/employee";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  private readonly filterSource = new Subject<string>();
  readonly employees$: Observable<Array<Employee>>;

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
    const filter$ = this.filterSource.pipe(debounceTime(50), startWith(""));
    this.employees$ = dataService.searchEmployees$(organizationId$, departmentId$, filter$);
  }

  ngOnInit(): void {
  }


  filterKeyUp(event: any): void {
    this.filterSource.next(event.target.value);
  }
}
