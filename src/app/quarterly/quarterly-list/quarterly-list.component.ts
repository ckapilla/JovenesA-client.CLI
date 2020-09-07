import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { SetSelectedYearPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { QuarterlyReportRPT } from '../../_shared/models/quarterly-reportRPT';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './quarterly-list.html',
  styleUrls: ['./quarterly-list.component.css']
})
export class QuarterlyListComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  readonly highlightStatuses: SELECTITEM[] = constants.highlightStatuses;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  qrMinis: QuarterlyReportRPT[];
  qrMini: QuarterlyReportRPT;
  selectedYearPeriod = '';
  displayTestNames: boolean;
  private subscription: Subscription;

  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;
  @Select(UIState.getSelectedYearPeriod) selectedYearPeriod$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public quarterlyData: QuarterlyDataService,
    public columnSorter: ColumnSortService,
    public store: Store,
    public session: SessionService
  ) {
    console.log('quarterly-list constructor');
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForSelectedYearPeriod();
  }

  subscribeForSelectedYearPeriod() {
    this.subscription = this.selectedYearPeriod$.subscribe((message) => {
      this.selectedYearPeriod = message;
      console.log('************NGXS: SR new selectedYearPeriod received' + this.selectedYearPeriod);
      this.fetchFilteredData();
    });
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  setSelectedYearPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedYearPeriod(yearPeriod));
  }

  gotoStudent(studentGUId: string) {
    this.store.dispatch(new SetSelectedStudentGUId(studentGUId));
    const link = ['quarterly/edit'];
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    return this.qrMinis.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('quarterly-list data fetch ');
    this.quarterlyData.getQRMinisForPeriod(this.selectedYearPeriod, 0).subscribe(
      (data) => {
        this.qrMinis = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName !== '_Test, _Student') {
            return item;
          }
        });
      },
      (err) => {
        console.error('Subscribe error: ' + err);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        if (this.qrMinis && this.qrMinis.length > 0) {
          console.log('### after retreiving, grid to data ' + this.qrMinis[0].quarterlyReportGUId);
        } else {
          console.log('no results returned');
        }
      }
    );
  }
  setStatusForQR(rptEntryIdx: number, statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);

    this.quarterlyData.setQRReviewedStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, statusId).subscribe(
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
  setHighlightStatusForQR(rptEntryIdx: number, highlightStatusId: number) {
    console.log('selected highlightStatusId: ' + highlightStatusId);
    console.log('selected RQGUID:' + this.qrMinis[rptEntryIdx].quarterlyReportGUId);

    this.quarterlyData.setQRHighlightStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, highlightStatusId).subscribe(
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
}
