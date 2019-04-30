
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummarySentCount } from '../shared/report-models/sponsor-summary-sent-count';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';

import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { isNumber } from 'util';

@Component({
  templateUrl: './reports-sponsor-summaries-sent.component.html',
  styleUrls: ['./reports-sponsor-summaries-sent.component.css']
})

export class ReportsSponsorSummariesSentComponent implements OnInit {
  reportTypes: SELECTITEM[];
  sponsorSummarySentCounts: SponsorSummarySentCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  constructor(
              public router: Router,
              public sqlReports: SqlReports,
              private columnSorter: ColumnSortService
              ) {
    this.isLoading = false;
  }

/*
https://plnkr.co/edit/DITVzCSqHHB1uNrTxFit?p=info
*/


  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for SponsorSummarySentCounts');
    this.isLoading = true;
    this.sqlReports.getSponsorSummarySentCounts()
      .subscribe(
        data => { this.sponsorSummarySentCounts = data;
                console.log(this.sponsorSummarySentCounts[0]); },
        err => { this.errorMessage =  err; } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.sponsorSummarySentCounts.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

  mentorReportsReview(id: number) {
    this.router.navigate(['/admins/students/student/mentorReports/' + id  + '/']);
  }



}
