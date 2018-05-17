
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { MentorReportSubmittedCount } from '../shared/report-models/mentor-report-submitted-count';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';

import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { isNumber } from 'util';



@Component({

  templateUrl: './reports-mentor-reports-submitted.component.html',
  styleUrls: ['./reports-mentor-reports-submitted.component.css']
})

export class ReportsMentorReportsSubmittedComponent implements OnInit {
  reportTypes: SELECTITEM[];
  mentorReportSubmittedCounts: MentorReportSubmittedCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  constructor(
              public sqlReports: SqlReports,
              private columnSorter: ColumnSortService
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
    console.log('fetchData for MentorReportsSubmittedCounts');
    this.isLoading = true;
    this.sqlReports.getMentorReportSubmittedCounts()
      .subscribe(
        data => { this.mentorReportSubmittedCounts = data;
                console.log(this.mentorReportSubmittedCounts[0]); },
        err => { this.errorMessage =  err; } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.mentorReportSubmittedCounts.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

}
