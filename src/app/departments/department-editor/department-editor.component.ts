import {Component, OnInit} from '@angular/core';
import {filter, map, Observable, shareReplay, startWith, Subject, switchMap, take, tap} from "rxjs";
import {Department} from "../../core/models/department";
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {isNotNull} from "../../core/utils";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-department-editor',
  templateUrl: './department-editor.component.html',
  styleUrls: ['./department-editor.component.scss']
})
export class DepartmentEditorComponent implements OnInit {
  private readonly organizationId$: Observable<string>
  readonly cancelSource = new Subject<any>();
  readonly department$: Observable<Department>;

  constructor(private activatedRoute: ActivatedRoute, private dataService: MockedDataService) {
    this.organizationId$ = activatedRoute.paramMap
      .pipe(
        map(params => params.get("organizationId")),
        filter(isNotNull),
      )
    const departmentId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("departmentId")),
        filter(isNotNull),
      )
    this.department$ = dataService.getDepartment$(this.organizationId$, departmentId$)
      .pipe(
        switchMap(model => this.cancelSource
          .pipe(
            startWith({}),
            map(() => (Object.assign({}, model))),
            tap(() => "loading..."),
          )
        ),
        shareReplay({bufferSize: 1, refCount: true}),
      );
  }

  ngOnInit(): void {
  }

  onSave(ngForm: NgForm): void {
    this.organizationId$
      .pipe(
        take(1)
      )
      .subscribe(organizationId => {
        this.dataService.saveDepartment$(organizationId, ngForm.form.value);
        ngForm.form.markAsPristine();
        ngForm.form.markAsUntouched();
        ngForm.form.updateValueAndValidity();
      })
  }

  onCancel(ngForm: NgForm): void {
    this.cancelSource.next({});
    ngForm.form.markAsPristine();
    ngForm.form.markAsUntouched();
    ngForm.form.updateValueAndValidity();
  }
}
