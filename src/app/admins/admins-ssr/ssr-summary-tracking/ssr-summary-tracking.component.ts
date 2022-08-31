import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { StudentSelfReportDataService } from '../../../_shared/data/student-self-report-data.service';
import { SELECTITEM } from '../../../_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from '../../../_shared/models/student-self-report';
import { UIState } from '../../../_store/ui/ui.state';

@Component({
  selector: 'app-ssr-summary-tracking',
  templateUrl: 'ssr-summary-tracking.component.html',
  styleUrls: ['ssr-summary-tracking.component.css']
})
export class StudentSelfReportsTrackingComponent implements OnInit
{
  // implements OnInit {
  studentReportsByPeriod: StudentSelfReport[];
  isLoading: boolean;
  smileys: Array<string>;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  mentorReportStatuses: SELECTITEM[];
  years: SELECTITEM[];
  months: SELECTITEM[];
  ssrReviewedStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];
  selectedSSRYear: string;
  selectedSSRPeriod: string;
  selectedSSRReviewedStatus: string;
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedQRPeriod = '';
  selectedHighlightStatus: string;
  displayOriginalFields = true;
  x: any;
  studentName: string;
  displayTestNames: boolean;
  subscription: Subscription;

  @Select(UIState.getSelectedQRPeriod) selectedQRPeriod$: Observable<string>;
  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public router: Router,
    private store: Store,
    public ssrData: StudentSelfReportDataService,
    private route: ActivatedRoute
  ) {
    console.log('ssr-summary-tracking constructor');
    this.years = constants.contactYears;
    this.months = constants.months;

    this.ssrReviewedStatuses = constants.reviewedStatuses;

    this.highlightStatuses = constants.highlightStatuses;

    this.selectedSSRYear = '' + constants.currentContactYear; // '' + today.getFullYear(); //
    this.selectedSSRPeriod = '0'; // + today.getMonth() + 1;// '5';

    this.selectedSSRReviewedStatus = '0'; // this.mrReviewedStatuses[0].value;
    this.selectedHighlightStatus = this.highlightStatuses[0].value;

    this.smileys = constants.smileys;
    console.log('before process route params');
    this.processRouteParams();


  }

  ngOnInit(): void {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
      // this.fetchFilteredData();
    });
  }


  processRouteParams() {
    console.log('summaryTracking setting filters form queryParams');

    const year = this.route.snapshot.queryParams['year'];
    console.log('year param = ' + year);
    if (year !== undefined) {
      this.selectedSSRYear = year;
    }

    let period = this.route.snapshot.queryParams['period'];
    console.log('period param = ' + period);
    if (period !== undefined) {
      this.selectedSSRPeriod = period;
    } else {
      // const x: Date;
      const x: Date = new Date();
      console.log(x);
      const y = this.addDays(x, -2);
      console.log(y);
      period = '' + (y.getMonth() + 1);
      this.selectedSSRPeriod = period;
    }

    const reviewedStatus = this.route.snapshot.queryParams['reviewedStatus'];
    console.log('reviewed param = ' + reviewedStatus);
    if (reviewedStatus !== undefined) {
      this.selectedSSRReviewedStatus = reviewedStatus;
    } else {
      this.selectedSSRReviewedStatus = '0';
    }

    const highlight = this.route.snapshot.queryParams['highlight'];
    console.log('highlight param = ' + highlight);
    if (highlight !== undefined) {
      this.selectedHighlightStatus = highlight;
    } else {
      this.selectedHighlightStatus = '0';
    }

    if (period !== undefined && period > 0) {
      this.fetchFilteredData();
    }
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for MentorReportsByMonth');
    this.ssrData
      // .getStudentSelfReportsByPeriod(this.selectedSSRYear, this.selectedSSRPeriod, this.selectedSSRReviewedStatus)
      .getStudentSelfReportsByPeriod(// '2022-2', this.selectedSSRReviewedStatus, '10dbe12d-6b18-4766-b607-ffb07ceb230b')

      '2022-2', // this.selectedQRPeriod,
      '0', // this.selectedSRReviewedStatus,
      null
      )
      .subscribe(
        (data) => {
          this.studentReportsByPeriod = data.filter((item) => {
            if (this.displayTestNames) {
              return item;
            } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
              return item;
            }
          });
          console.log('mentorReportByMonth has');
          console.log(this.studentReportsByPeriod[0]);
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

  setSelectedMRReviewedStatus(status: string) {
    this.selectedSSRReviewedStatus = status;
    this.fetchFilteredData();
  }

  setSelectedHighlightStatus(status: string) {
    this.selectedHighlightStatus = status;
    this.fetchFilteredData();
  }

  setSelectedYear(year: string) {
    this.selectedSSRPeriod = year;
    this.fetchFilteredData();
  }
  setSelectedPeriod(period: string) {
    this.selectedSSRPeriod= period;
    this.fetchFilteredData();
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  updateSSRTracking(id: number, studentGUId: string, studentName: string) {
    // AABBCCDD
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log(studentName);
    console.log(id);
    const link: [string, { studentSelfReportId: number }] = [
      '/admins/student-reports/summary-updates',
      {
        studentSelfReportId: id
      }
    ];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  translationNeeded(lang1: number, lang2: number): string {
    console.log(lang1, lang2);
    return lang1 === lang2 ? '' : 'Translation Needed';
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
  setSelectedQRPeriod(yearPeriod: string) {
    alert('skipping store update');
    // this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    // this.fetchFilteredData();
  }

}
