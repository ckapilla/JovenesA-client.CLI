
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummaryStatusCount } from '../shared/report-models/sponsor-summary-status-count';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './reports-sponsor-summaries-status.component.html'
})

export class ReportsSponsorSummariesStatusComponent implements OnInit {
  sponsorSummaryStatusCounts: SponsorSummaryStatusCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(
              public sqlReports: SqlReports
              ) {

    console.log('Hi from student List Ctrl controller function');

    this.isLoading = false;
  }



  ngOnInit() {
    console.log('ngOnInit');
    this.fetchFilteredData();
  }


  fetchFilteredData() {

    this.isLoading = true;
    this.sqlReports.getSponsorSummaryStatusCounts()
      .subscribe(
        data => { this.sponsorSummaryStatusCounts = data;
                console.log(this.sponsorSummaryStatusCounts[0]); },
        err => { this.errorMessage =  err } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

}
