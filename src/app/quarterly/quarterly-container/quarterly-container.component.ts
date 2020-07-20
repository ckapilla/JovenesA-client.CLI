import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuarterlyReportRPT } from 'src/app/_shared/models/quarterly-reportRPT';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { QuarterlyDataService } from '../../_shared/services/quarterly-data.service';

@Component({
  selector: 'app-quarterly-container',
  templateUrl: './quarterly-container.component.html'
})
export class QuarterlyContainerComponent implements OnInit, OnDestroy {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  periods: SELECTITEM[];
  activeQRPeriods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  selectedYearPeriod: string;
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  quarterlyReportGUId: string;
  selectedReviewedStatusID: string;
  qrMini = new QuarterlyReportRPT();
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public quarterlyData: QuarterlyDataService,
    private studentSelected: StudentSelectedService
  ) {
    this.years = constants.years;
    this.periods = constants.periods;
    this.activeQRPeriods = constants.activeQRperiods;

    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = constants.selectedYearPeriod; // '2020-2';
    this.studentGUIdReceived = false;
  }

  ngOnInit() {
    console.log('containerInit');
    // this.processRouteParams();
    this.subscribeForStudentGUIds();
    // console.log('after subscribe' + this.studentSelected.getInternalSubject().observers.length);
  }

  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{JA ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    this.subscription.unsubscribe();

    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    // console.log('JA set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('JA new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchFilteredData();
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }


  // processRouteParams() {
  //   console.log(' getting studentGUId from queryParams');

  //   const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
  //   if (studentGUIdQueryParam) {
  //     console.log('Qcontainer: have studentGUId from route ' + studentGUIdQueryParam);
  //   }
  // }


  fetchFilteredData() {
    console.log('fetchtFilteredData');
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {

      this.isLoading = true;
      this.quarterlyData.getQRMiniForStudentPeriod(this.studentGUId,
        this.selectedYear, this.selectedPeriod)
        .subscribe(
          data => {
            this.qrMini = data;
            console.log(data);
            this.selectedReviewedStatusID = '' + this.qrMini.reviewedStatusId;
            this.quarterlyReportGUId = this.qrMini.quarterlyReportGUId;
          },
          err => console.error('Subscribe error: ' + err),
          () => {
            this.isLoading = false;
          });
    }
  }

  setStatusForQR(statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);
    console.log('selected RQGUID:' + this.quarterlyReportGUId);

    this.quarterlyData.setQRReviewedStatus(this.quarterlyReportGUId, statusId)
      .subscribe(
        (student) => {
          this.successMessage = 'Updated';
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 500);
        },
        (error) => {
          this.errorMessage = <any>error;
          this.isLoading = false;
        }
      );
  }

  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedYearPeriod = yearPeriod;
    this.selectedYear = yearPeriod.substr(0, 4);
    this.selectedPeriod = yearPeriod.substr(5, 1);
  }
  onStudentGUIdReceived(bSet: boolean) {
    this.studentGUIdReceived = bSet;
  }

}
