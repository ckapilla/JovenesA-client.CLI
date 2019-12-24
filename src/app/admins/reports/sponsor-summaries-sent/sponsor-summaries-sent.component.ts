
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../../_shared/interfaces/SORTCRITERIA';
import { ColumnSortService } from '../../../_shared/services/column-sort.service';
import { SponsorSummarySentCount } from '../shared/report-models/sponsor-summary-sent-count';
import { SqlReports } from '../sql-reports';

@Component({
  templateUrl: './sponsor-summaries-sent.component.html',
  styleUrls: ['./sponsor-summaries-sent.component.css']
})

export class SponsorSummariesSentComponent implements OnInit {
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
        data => {
          this.sponsorSummarySentCounts = data;
          console.log(this.sponsorSummarySentCounts[0]);
        },
        err => { this.errorMessage = err; },
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

  mentorReportsReview(studentId: number, studentName: string) {
    console.log('mentorReportsReview clicked with studentId' + studentId);
    this.router.navigate(['/admins/students/student/mentorReports/' + studentId + '/' + studentName]);
  }



}
