import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { QuarterlyReportRPT } from '../../_shared/models/quarterly-reportRPT';
import { QuarterlyDataService } from '../../_shared/services/quarterly-data.service';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './quarterly-list.html',
  styleUrls: ['./quarterly-list.component.css']
})
export class QuarterlyListComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  periods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  qrMinis: QuarterlyReportRPT[];
  qrMini: QuarterlyReportRPT;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  readonly highlightStatuses: SELECTITEM[] = constants.highlightStatuses;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public quarterlyData: QuarterlyDataService,
    public columnSorter: ColumnSortService,
    public studentSelected: StudentSelectedService,
    public session: SessionService) {

    console.log('quarterly-list constructor');

    this.years = constants.years;
    this.periods = constants.periods;

    this.selectedYear = '2019'; // '' + today.getFullYear(); //
    this.selectedPeriod = '4'; // + today.getPeriod() + 1;// '5';

    this.isLoading = false;
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

  setSelectedYear(year: string) {
    this.selectedYear = year;
    this.fetchFilteredData();
  }
  setSelectedPeriod(period: string) {
    this.selectedPeriod = period;
    this.fetchFilteredData();
  }

  gotoStudent(studentGUId: string, studentName: string) {
    this.studentSelected.notifyNewStudentGUId(studentGUId);
    const link = ['quarterly/edit']; // , { guid: studentGUId }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.qrMinis.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

  fetchFilteredData() {
    console.log('fetchData for QR Overview');
    this.isLoading = true;
    // this.miscData.getStudentSelfReportsByPeriod('2019', '3', '0', this.studentGUId)
    this.quarterlyData.getQRMinisForPeriod(
      this.selectedYear, this.selectedPeriod, 0)
      .subscribe(
        data => { this.qrMinis = data; },
        err => {
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

        });
  }
  setStatusForQR(rptEntryIdx: number, statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);
    console.log('selected RQGUID:' + this.qrMinis[rptEntryIdx].quarterlyReportGUId);

    this.quarterlyData.setQRReviewedStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, statusId)
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
  setHighlightStatusForQR(rptEntryIdx: number, highlightStatusId: number) {
    console.log('selected highlightStatusId: ' + highlightStatusId);
    console.log('selected RQGUID:' + this.qrMinis[rptEntryIdx].quarterlyReportGUId);

    this.quarterlyData.setQRHighlightStatus(this.qrMinis[rptEntryIdx].quarterlyReportGUId, highlightStatusId)
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


}
