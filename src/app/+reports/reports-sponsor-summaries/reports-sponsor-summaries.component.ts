
import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';

import { SponsorSummaryStatusCount } from '../shared/report-models/sponsor-summary-status-count';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './reports-sponsor-summaries.component.html'
})

export class ReportsSponsorSummariesComponent implements OnInit {
  reportTypes: SELECTITEM[];
  sponsorSummaryStatusCounts: SponsorSummaryStatusCount[];
  selectedReportType: string;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(
              public sqlReports: SqlReports
              ) {

    console.log('Hi from student List Ctrl controller function');

    this.reportTypes = [
      { value: 'ByMonthYear', label: 'ByMonthYear' },
      { value: 'ByStudent', label: 'ByStudent' },
      { value: 'ByPledgeGroup', label: 'ByPledgeGroup' }
    ];

    this.selectedReportType = this.reportTypes[0].value; // ByMonthYear

    this.isLoading = false;
  }



  ngOnInit() {
    console.log('ngOnInit');
    this.fetchFilteredData();
  }

  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below
  setSelectedReportType(reportType: string) {
    // console.log('selected status: ' + status);
    this.selectedReportType = reportType;
    this.fetchFilteredData();
  }

  fetchFilteredData() {

    this.isLoading = true;
    this.sqlReports.getSponsorSummaryStatusCounts(this.selectedReportType)
      .subscribe(
        data => { this.sponsorSummaryStatusCounts = data;
                console.log(this.sponsorSummaryStatusCounts[0]); },
        err => { this.errorMessage =  err } ,
        () => { console.log('done'); this.isLoading = false; }
      );
  }

}
