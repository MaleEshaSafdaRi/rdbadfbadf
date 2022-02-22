import {Component, OnInit} from '@angular/core';
import {debounceTime, filter, map, Observable, startWith, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {isNotNull} from "../../core/utils";
import {Department} from "../../core/models/department";

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit {
  private readonly filterSource = new Subject<string>();
  readonly departments$: Observable<Array<Department>>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: MockedDataService) {
    const organizationId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("organizationId")),
        filter(isNotNull),
      )
    const filter$ = this.filterSource.pipe(debounceTime(50), startWith(""));
    this.departments$ = dataService.searchDepartments$(organizationId$, filter$);
  }

  ngOnInit(): void {
  }

  filterKeyUp(event: any): void {
    this.filterSource.next(event.target.value);
  }
}
