import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { MentorReportByMonth } from '../../app_shared/models/mentor-report-by-month';
import { ParamMap } from '@angular/router/src/shared';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: 'mr-summary-tracking.component.html',
  styleUrls: ['mr-summary-tracking.component.css']
})
export class MentorReportsSummaryTrackingComponent implements OnInit {
  mentorReportByMonth: MentorReportByMonth[];
  isLoading: boolean;
  smileys: Array<string>;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  mentorReportStatuses: SELECTITEM[];
  years: SELECTITEM[];
  months: SELECTITEM[];
  mrSummaryStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedMRSummaryStatus: string;
  selectedHighlightStatus: string;
  displayOriginalFields = false;

  constructor(
              public router: Router,
              public session: SessionService,
              public sqlResource: SqlResource,
              private route: ActivatedRoute
  ) {


    this.years = [
      { value: '2017', label: '2017' },
      { value: '2018', label: '2018' }
    ];

     this.months = [
      {value: '0', label: 'Select'},
      {value: '1', label: 'Jan'},
      {value: '2', label: 'Feb'},
      {value: '3', label: 'Mar'},
      {value: '4', label: 'Apr'},
      {value: '5', label: 'May'},
      {value: '6', label: 'Jun'},
      {value: '7', label: 'Jul'},
      {value: '8', label: 'Aug'},
      {value: '9', label: 'Sep'},
      {value: '10', label: 'Oct'},
      {value: '11', label: 'Nov'},
      {value: '12', label: 'Dec'}
    ];

    this.mrSummaryStatuses = [
      { value: '0', label: '[All]' },
      { value: '2086', label: 'NeedsSetup' },
      { value: '2087', label: 'NeedsReview' },
      { value: '2088', label: 'ReadyToSend' },
      { value: '2089', label: 'Sent'},
      { value: '2090', label: 'Skipped'}
    ];

      this.highlightStatuses = [
        { value: '0', label: '[All]' },
        { value: '2105', label: 'Problems' },
        { value: '2106', label: 'GoodNews' },
      ];


      // this.followUpStatuses = [
      //   { value: '0', label: '[All]' },
      //   { value: '2091', label: 'Flagged' },
      //   { value: '2092', label: 'Assigned' },
      //   { value: '2104', label: 'Closed' },
      // ];

    const today = new Date();
    this.selectedYear =  '2018'; // '' + today.getFullYear(); //
    this.selectedMonth = '0'; // + today.getMonth() + 1;// '5';

    this.selectedMRSummaryStatus = this.mrSummaryStatuses[0].value;
    this.selectedHighlightStatus = this.highlightStatuses[0].value;


    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];

  }

  ngOnInit() {
    console.log('in OnInit');

    const year = this.route.snapshot.queryParams['year'];
    console.log('year param = ' +  year);
    if (year !== undefined) {
      this.selectedYear =  year;
    }

      const month = this.route.snapshot.queryParams['month'];
      console.log('month param = ' +  month);
      if (month !== undefined) {
        this.selectedMonth =  month;
      }
      const summary = this.route.snapshot.queryParams['summaryStatus'];
      console.log('summary param = ' +  summary);
      if (month !== undefined) {
        this.selectedMRSummaryStatus =  summary;
      } else {
        this.selectedMRSummaryStatus =  '0';
      }

      const highlight = this.route.snapshot.queryParams['highlight'];
      console.log('highlight param = ' +  highlight);
      if (highlight !== undefined) {
        this.selectedHighlightStatus =  highlight;
      } else {
        this.selectedHighlightStatus =  '0';
      }

    this.fetchFilteredData();

  }


  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for MentorReportsByMonth');
    this.sqlResource.getMentorReportsByMonth(this.selectedYear,
                  this.selectedMonth,
                  this.selectedMRSummaryStatus,
                  this.selectedHighlightStatus)
      .subscribe(
        data => {this.mentorReportByMonth = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false; }
      );

  }

  scrollIntoView() {

      console.log (this.route.snapshot.queryParams['id']);
      if (this.route.snapshot.queryParams['id']) {
        const idSelector = '#' + this.route.snapshot.queryParams['id'];
        console.log('id param = ' +  this.route.snapshot.queryParams['id']);
          const element = document.querySelector(idSelector);
          if (element) {
            console.log('querySelector returns element ' + element);
            element.scrollIntoView(true);
        }
      }
  }

  setSelectedMRSummaryStatus(status: string) {
    this.selectedMRSummaryStatus = status;
    this.fetchFilteredData();
  }

  setSelectedHighlightStatus(status: string) {
    this.selectedHighlightStatus = status;
    this.fetchFilteredData();
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
    this.fetchFilteredData();
  }
  setSelectedMonth(month: string) {
    this.selectedMonth = month;
    this.fetchFilteredData();
  }

  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setAssignedStudentName(studentName);

    // const link = ['/admins/students/student/' + id];
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoReportSummary(id: number) {
    //const link = ['/admins/mentor-reports/summary-updates?id=' + id + '&summaryStatus=' + 2087 + '&highlight=' + 2106];
    const link: [string , { mentorReportId: number, summaryStatus: string, highlight: string}]
      = ['/admins/mentor-reports/summary-updates',
          { mentorReportId: id, summaryStatus: this.selectedMRSummaryStatus, highlight: this.selectedHighlightStatus}];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  translationNeeded(lang1: number, lang2: number): string {
    console.log(lang1, lang2);
    return (lang1 === lang2) ? '' : 'Translation Needed';
  }

  getHighlightColor(highlightStatusId: number): string {

    if (highlightStatusId === 2106) {
      console.log('returning ' + 'green-row');
      return 'green-row';
    } else if (highlightStatusId === 2105) {
      return 'red-row';
    } else {
      return '';
    }
  }

}
