import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from '../../_shared/models/student-self-report';

@Component({
  selector: 'app-self-report-tracking',
  templateUrl: 'self-report-tracking.component.html',
  styleUrls: ['self-report-tracking.component.css']
})
export class SelfReportTrackingComponent implements OnInit {
  studentReportsByPeriod: StudentSelfReport[];
  isLoading: boolean;
  smileys: Array<string>;
  public errorMessage: string;
  successMessage: string;
  submitted: string;
  readonly qrPeriods = constants.qrPeriods;
  readonly ssrReviewedStatuses = constants.reviewedStatuses;
  studentReportStatuses: SELECTITEM[];
  highlightStatuses: SELECTITEM[];

  selectedQRPeriod: string;
  studentGUId: string;
  selectedSRReviewedStatus: string;
  displayOriginalFields = true;
  studentName: string;
  subscription: Subscription;
  displayTestNames: boolean;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;
  @Select(UIState.getSelectedQRPeriod) selectedQRPeriod$: Observable<string>;
  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public router: Router,
    private store: Store,
    public ssrData: StudentSelfReportDataService,
    private route: ActivatedRoute
  ) {
    this.selectedSRReviewedStatus = '0'; // this.ssrReviewedStatuses[0].value;
    this.smileys = constants.smileys;
  }

  ngOnInit() {
    console.log('ssr trackingonInit');
    this.subscribeForStudentGUIds2();
    this.subscribeForselectedQRPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: quarterlyContainer new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SR new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    if (this.selectedQRPeriod !== '' && this.selectedQRPeriod !== undefined) {
      this.isLoading = true;
      console.log('in fetchData for StudentReportsByPeriod');
      this.ssrData
        .getStudentSelfReportsByPeriod(
          this.selectedQRPeriod,
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
            console.log('studentReportByPeriod has');
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

  setSelectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedQRPeriod(yearPeriod));
    this.fetchFilteredData();
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  updateSelfReportTracking(id: number, studentGUId: string, studentName: string) {
    // AABBCCDD
    // this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log(studentName);
    console.log(id);
    const link: [string, { studentSelfReportId: number }] = [
      '/becas/self-reports-updates',
      {
        studentSelfReportId: id
      }
    ];

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
}
