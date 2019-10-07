import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnSortService } from 'src/app/app_shared/services/column-sort.service';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected-service';
import { constants } from '../../app_shared/constants/constants';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { SessionService } from '../../app_shared/services/session.service';
import { QuarterlyDataService } from '../quarterly-data.service';
import { QuarterlyReportRPT } from '../quarterly-reportRPT';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;

  qrMinis: QuarterlyReportRPT[];
  qrMini: QuarterlyReportRPT;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public quarterlyData: QuarterlyDataService,
    public columnSorter: ColumnSortService,
    public studentSelected: StudentSelectedService,
    public session: SessionService) {

    console.log('overview constructor');

    // this.gradeRptsStatus = 'yellowWarning.jpg'
    // this.gpaStatus = 'greenCheck.jpg'

    this.isLoading = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.processRouteParams();
    this.fetchData();
  }

  scrollIntoView() {

    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  gotoStudent(studentGUId: string, studentName: string) {
    // console.log('setting studentName to ' + studentName);
    // this.session.setStudentInContextName(studentName);

    this.studentSelected.notifyNewStudentGUId(studentGUId);

    const link = ['quarterly/edits']; // , { guid: studentGUId }];

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

  fetchData() {
    console.log('fetchData');
    this.isLoading = true;
    // this.sqlResource.getStudentSelfReportsByPeriod('2019', '3', '0', this.studentGUId)
    this.quarterlyData.getQRMinisForPeriod(2019, 3, 0)
      .subscribe(
        data => { this.qrMinis = data; },
        err => console.error('Subscribe error: ' + err),
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
          console.log(this.errorMessage = <any>error);
          this.isLoading = false;
        }
      );
  }
}
