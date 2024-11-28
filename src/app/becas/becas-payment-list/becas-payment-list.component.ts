import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { BecaDataService } from '../../_shared/data/beca-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { BecaPaymentDTO } from '../../_shared/models/beca-paymentDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './becas-payment-list.component.html'
})
export class BecasPaymentListComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;

  years: SELECTITEM[];
  months: SELECTITEM[];

  selectedYear: string;
  selectedMonth: string;

  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  // readonly highlightStatuses: SELECTITEM[] = constants.highlightStatuses;
  selectedReviewedStatus: string;
  selectedHighlightStatus: string;

  becaPmt: BecaPaymentDTO;
  becaPmts: BecaPaymentDTO[];
  selectedQRPeriod = '';
  displayTestNames: boolean;
  private subscription: Subscription;
// #####
   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
   readonly contactYears: SELECTITEM[] = constants.contactYears;
   readonly contactMonths: SELECTITEM[] = constants.months;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public becaData: BecaDataService,
    public columnSorter: ColumnSortService,
    public store: Store,
    public session: SessionService
  ) {
    console.log('beca payments-list constructor');
    this.years = constants.contactYears;
    this.months = constants.months;
    this.reviewedStatuses = constants.becaPaymentStatuses;

    // this.highlightStatuses = constants.highlightStatuses;

    this.selectedYear = '' + constants.currentContactYear; // '' + today.getFullYear(); //
    this.selectedMonth = '0'; // + today.getMonth() + 1;// '5';

    this.selectedReviewedStatus = '0'; // this.reviewedStatuses[0].value;
    // this.selectedHighlightStatus = this.highlightStatuses[0].value;

    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedYearMonth();
  }
  generateRandomNumber(): number {
    return Math.floor(100 + Math.random() * 900);
  }


  subscribeForselectedYearMonth() {
  //   this.subscription = this.selectedQRPeriod$.subscribe((message) => {
  //     this.selectedQRPeriod = message;
  //     console.log('************NGXS: BECA new selectedQRPeriod received' + this.selectedQRPeriod);
  //     this.fetchFilteredData();
  //   });
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  setSelectedReviewedStatus(status: string) {
    this.selectedReviewedStatus = status;
    this.fetchFilteredData();
  }

  // setSelectedHighlightStatus(status: string) {
  //   this.selectedHighlightStatus = status;
  //   this.fetchFilteredData();
  // }

  setSelectedYear(year: string) {
    this.selectedYear = year;
    this.fetchFilteredData();
  }
  setSelectedMonth(month: string) {
    this.selectedMonth = month;
    this.fetchFilteredData();
  }


  gotoStudent(studentGUId: string) {
    this.store.dispatch(new SetSelectedStudentGUId(studentGUId));
    const link = ['quarterly/edit'];
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.becaPmts.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('becas payments-list data fetch ');
    this.becaData.getBecaPaymentsByMonth(this.selectedYear, this.selectedMonth, '0').subscribe(
      (data) => {
        // console.log(JSON.stringify(data));
        this.becaPmts = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
            return item;
          }
        });
      },
      (err) => {
        console.error('Subscribe error: ' + err);
        this.isLoading = false;
      },
      () => {

        console.log(this.becaPmts.length);
        this.isLoading = false;
        if (this.becaPmts && this.becaPmts.length > 0) {
          console.log('### after retreiving, grid becaPaymentId: ' + this.becaPmts[0].becaPaymentId);
          console.log(JSON.stringify(this.becaPmts));
        } else {
          console.log('no results returned');
        }
      }
    );
  }
  setReviewedStatusID(rptEntryIdx: number, statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);

    this.becaData.setReviewedStatusId(this.becaPmts[rptEntryIdx].becaPaymentId, statusId).subscribe(
      () => {
        this.successMessage = 'Updated';
        window.setTimeout(() => {
          this.successMessage = '';
        }, 500);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  // setHighlightStatusForQR(rptEntryIdx: number, highlightStatusId: number) {
  //   console.log('selected highlightStatusId: ' + highlightStatusId);
  //   console.log('selected RQGUID:' + this.qrMinis[rptEntryIdx].quarterlyReportGUId);

  //   this.quarterlyData.setQRHighlightStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, highlightStatusId).subscribe(
  //     () => {
  //       this.successMessage = 'Updated';
  //       window.setTimeout(() => {
  //         this.successMessage = '';
  //       }, 500);
  //     },
  //     (error) => {
  //       this.errorMessage = error;
  //       this.isLoading = false;
  //     }
  //   );
  // }
}
