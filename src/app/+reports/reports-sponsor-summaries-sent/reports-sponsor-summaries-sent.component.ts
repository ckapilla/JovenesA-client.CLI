
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummarySentCount } from '../shared/report-models/sponsor-summary-sent-count';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { isNumber } from 'util';



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
  sortCriteria: SORTCRITERIA;

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
      if (sortCriteria.sortDirection === 'desc') {
        if (isNumber(a[sortCriteria.sortColumn])) {
          if (a[sortCriteria.sortColumn] === b[sortCriteria.sortColumn]) {
            return 0;
          } else {
            return (a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn]) ? 1 : -1;
          }
        }
        console.log('desc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
        return a[sortCriteria.sortColumn].localeCompare(b[sortCriteria.sortColumn]);
        // if ( a[sortCriteria.sortColumn] < b[sortCriteria.sortColumn] ) { return -1; }
        // if ( a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn] ) { return 1; }
        // return 0;
      } else {
        if (isNumber(a[sortCriteria.sortColumn])) {
          if (a[sortCriteria.sortColumn] === b[sortCriteria.sortColumn]) {
            return 0;
          } else {
            return (a[sortCriteria.sortColumn] < b[sortCriteria.sortColumn]) ? 1 : -1;
          }
        }
        console.log('asc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);

        return b[sortCriteria.sortColumn].localeCompare(a[sortCriteria.sortColumn]);
        // if ( a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn] ) { return -1; }
        // if ( a[sortCriteria.sortColumn] < b[sortCriteria.sortColumn] ) { return 1; }
        // return 0;
      }
    });
  }

  onSorted($event) {
    console.log('sorted event received');
    //this.fetchData();
  }

}
