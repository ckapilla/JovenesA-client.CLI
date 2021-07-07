import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../_shared/constants/constants';
import { ConfidentialDataService } from '../../_shared/data/confidential-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { ConfidentialReportRPT } from '../../_shared/models/confidential-reportRPT';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: 'confidential-reports-tracking.component.html',
  styleUrls: ['confidential-reports-tracking.component.css']
})
export class ConfidentialReportsTrackingComponent implements OnInit {
  confidentialReports: ConfidentialReportRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  mentorReportStatuses: SELECTITEM[];
  years: SELECTITEM[];
  months: SELECTITEM[];
  mrReviewedStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  selectedMRReviewedStatus: string;
  selectedHighlightStatus: string;
  displayOriginalFields = true;
  x: any;
  studentName: string;

  constructor(
    public router: Router,
    public session: SessionService,
    public confidntialReportData: ConfidentialDataService,
    private route: ActivatedRoute
  ) {
    this.years = constants.contactYears;
    this.months = constants.months;
    this.smileys = constants.smileys;
  }

  ngOnInit() {
    console.log('onInit');
    this.processRouteParams();
    this.fetchFilteredData();
  }

  processRouteParams() {
    //   console.log('summaryTracking setting filters form queryParams');
    //   const year = this.route.snapshot.queryParams['year'];
    //   console.log('year param = ' + year);
    //   if (year !== undefined) {
    //     this.selectedYear = year;
    //   }
    //   let month = this.route.snapshot.queryParams['month'];
    //   console.log('month param = ' + month);
    //   if (month !== undefined) {
    //     this.selectedMonth = month;
    //   } else {
    //     // const x: Date;
    //     const x: Date = new Date();
    //     console.log(x);
    //     const y = this.addDays(x, -2);
    //     console.log(y);
    //     month = '' + (y.getMonth() + 1);
    //     this.selectedMonth = month;
    //   }
    //   const reviewedStatus = this.route.snapshot.queryParams['reviewedStatus'];
    //   console.log('reviewed param = ' + reviewedStatus);
    //   if (reviewedStatus !== undefined) {
    //     this.selectedMRReviewedStatus = reviewedStatus;
    //   } else {
    //     this.selectedMRReviewedStatus = '0';
    //   }
    //   const highlight = this.route.snapshot.queryParams['highlight'];
    //   console.log('highlight param = ' + highlight);
    //   if (highlight !== undefined) {
    //     this.selectedHighlightStatus = highlight;
    //   } else {
    //     this.selectedHighlightStatus = '0';
    //   }
    //   if (month !== undefined && month > 0) {
    //     this.fetchFilteredData();
    //   }
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for LatedConfidentialReports');
    this.confidntialReportData.getLatestConfidentialReportRPTs().subscribe(
      (data) => {
        this.confidentialReports = data;
        console.log('mentorReportByMonth has');
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );
  }

  scrollIntoView() {
    console.log('in scrollIntoView');
    if (this.route.snapshot.queryParams['id']) {
      console.log(this.route.snapshot.queryParams['id']);
      const idSelector = '#' + this.route.snapshot.queryParams['id'];
      console.log('id param = ' + this.route.snapshot.queryParams['id']);
      const element = document.querySelector(idSelector);
      if (element) {
        console.log('querySelector returns element ' + element);
        element.scrollIntoView(true);
      }
    }
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    // XXYYZZ this.session.setStudentInContextName(studentName);

    // const link = ['/admins/students/student/' + id];
    const link = ['admins/students/student', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  getHighlightColor(highlightStatusId: number): string {
    if (highlightStatusId === 2106) {
      // console.log('returning ' + 'green-row');
      return 'green-row';
    } else if (highlightStatusId === 2105) {
      return 'red-row';
    } else {
      return '';
    }
  }
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
