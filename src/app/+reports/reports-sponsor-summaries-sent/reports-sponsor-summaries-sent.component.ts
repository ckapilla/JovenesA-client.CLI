
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummarySentCount } from '../shared/report-models/sponsor-summary-sent-count';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './reports-sponsor-summaries-sent.component.html',
  styleUrls: ['./reports-sponsor-summaries-sent.component.css']
})

export class ReportsSponsorSummariesSentComponent implements OnInit {
  reportTypes: SELECTITEM[];
  sponsorSummarySentCounts: SponsorSummarySentCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(
              public sqlReports: SqlReports
              ) {
    this.isLoading = false;
  }

/*
https://plnkr.co/edit/DITVzCSqHHB1uNrTxFit?p=info
*/


  // ngOnInit(){
  //   this.fetchData({sortColumn: 'id', sortDirection:'asc'});
  // }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for SponsorSummarySentCounts')
    this.isLoading = true;
    this.sqlReports.getSponsorSummarySentCounts()
      .subscribe(
        data => { this.sponsorSummarySentCounts = data;
                console.log(this.sponsorSummarySentCounts[0]); },
        err => { this.errorMessage =  err } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

  onSorted($event) {
    this.fetchData();
  }

}
