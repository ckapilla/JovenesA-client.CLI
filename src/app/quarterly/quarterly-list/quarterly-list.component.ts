import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
// delete me import { SelectedStudent } from 'src/app/_store/selectedStudent/selected-student.service';
// import { TestNamesVisibilityService } from 'src/app/_store/testNamesVisibility/test-names-visibility.service';
import { constants } from '../../_shared/constants/constants';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { QuarterlyReportRPT } from '../../_shared/models/quarterly-reportRPT';
import { SessionService } from '../../_shared/services/session.service';
@Component({
  templateUrl: './quarterly-list.html',
  styleUrls: [ './quarterly-list.component.css' ]
})
export class QuarterlyListComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  periods: SELECTITEM[];
  activeQRPeriods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  selectedYearPeriod: string;
  qrMinis: QuarterlyReportRPT[];
  qrMini: QuarterlyReportRPT;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  readonly highlightStatuses: SELECTITEM[] = constants.highlightStatuses;
  displayTestNames: boolean;

  @Select(StudentState.getSelectedStudentGUId)  currentGUId$: Observable<string>;
  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public quarterlyData: QuarterlyDataService,
    public columnSorter: ColumnSortService,
    // public selectedStudent: SelectedStudent,
    public store: Store,
    public session: SessionService,
    // public testNamesVisibilityService: TestNamesVisibilityService
  ) {
    console.log('quarterly-list constructor');

    this.years = constants.years;
    this.periods = constants.periods;
    this.activeQRPeriods = constants.activeQRperiods;

    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = constants.selectedYearPeriod;

    this.isLoading = false;
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.fetchFilteredData();
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedYearPeriod = yearPeriod;
    this.selectedYear = yearPeriod.substr(0, 4);
    this.selectedPeriod = yearPeriod.substr(5, 1);
    this.fetchFilteredData();
  }

  gotoStudent(studentGUId: string) {
    // this.selectedStudent.notifyNewStudentGUId(studentGUId);
    this.store.dispatch(new SetSelectedStudentGUId(studentGUId))
    const link = [ 'quarterly/edit' ]; // , { guid: studentGUId }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.qrMinis.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }

  fetchFilteredData() {
    console.log('fetchData for QR Overview');
    this.isLoading = true;
    // this.miscData.getStudentSelfReportsByPeriod('2019', '3', '0', this.studentGUId)
    this.quarterlyData.getQRMinisForPeriod(this.selectedYear, this.selectedPeriod, 0).subscribe(
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
        // console.log(JSON.stringify(this.qrMinis));
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
    console.log('selected RQGUID:' + this.qrMinis[rptEntryIdx].quarterlyReportGUId);

    this.quarterlyData.setQRReviewedStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, statusId).subscribe(
      () => {
        this.successMessage = 'Updated';
        window.setTimeout(() => {
          // console.log('clearing success message');
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

    this.quarterlyData
      .setQRHighlightStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, highlightStatusId)
      .subscribe(
        () => {
          this.successMessage = 'Updated';
          window.setTimeout(() => {
            // console.log('clearing success message');
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
