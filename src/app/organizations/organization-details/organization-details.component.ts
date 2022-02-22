import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MockedDataService} from "../../core/mocked-data.service";
import {filter, map, Observable} from "rxjs";
import {Organization} from "../../core/models/organization";
import {isNotNull} from "../../core/utils";

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {
  readonly organization$: Observable<Organization>;
  constructor(private activatedRoute: ActivatedRoute, private dataService: MockedDataService) {
    const organizationId$: Observable<string> = activatedRoute.paramMap
      .pipe(
        map(params => params.get("organizationId")),
        filter(isNotNull),
      )
    this.organization$ = dataService.getOrganization$(organizationId$);
  }

  ngOnInit(): void {
  }

}
