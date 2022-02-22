import {Component, OnInit} from '@angular/core';
import {MockedDataService} from "../../core/mocked-data.service";
import {Observable} from "rxjs";
import {Organization} from "../../core/models/organization";

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  readonly organizations$: Observable<Array<Organization>>;

  constructor(private dataService: MockedDataService) {
    this.organizations$ = dataService.getOrganizations$();
  }

  ngOnInit(): void {
  }

}
