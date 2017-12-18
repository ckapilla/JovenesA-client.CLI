
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummaryCountByPerson } from '../shared/report-models/sponsor-summary-count-by-person';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './reports-sponsor-summaries2.component.html'
})

export class ReportsSponsorSummaries2Component implements OnInit {
  reportTypes: SELECTITEM[];
  sponsorSummaryCountsByPerson: SponsorSummaryCountByPerson[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(
              public sqlReports: SqlReports
              ) {
    this.isLoading = false;
  }


  // ngOnInit(){
  //   this.fetchData({sortColumn: 'id', sortDirection:'asc'});
  // }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
  }

  fetchData() {

    this.isLoading = true;
    this.sqlReports.getSponsorSummaryCountsByPerson()
      .subscribe(
        data => { this.sponsorSummaryCountsByPerson = data;
                console.log(this.sponsorSummaryCountsByPerson[0]); },
        err => { this.errorMessage =  err } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

  onSorted($event) {
    this.fetchData();
  }

}
