import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { QuarterlyDataService } from 'src/app/_shared/data/quarterly-data.service';
import { QuarterlyReportRPT } from 'src/app/_shared/models/quarterly-reportRPT';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../constants/constants';
import { SELECTITEM } from '../../interfaces/SELECTITEM';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-qr-status-selector',
  templateUrl: './qr-status-selector.component.html',
  styleUrls: ['./qr-status-selector.component.css']
})
export class QrStatusSelectorComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  successMessage: string;
  qrMini: QuarterlyReportRPT;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  studentGUId: string; // 'model' for this component
  private subscription: Subscription;
  selectedYearPeriod: '' | string;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;
  @Select(UIState.getSelectedYearPeriod) selectedYearPeriod$: Observable<string>;

  constructor(
    public quarterlyData: QuarterlyDataService,
    // public selectedStudent: SelectedStudent,
    public session: SessionService
  ) {}

  ngOnInit() {
    this.qrMini = new QuarterlyReportRPT();
    this.subscribeForStudentGUIds2();
    this.subscribeForSelectedYearPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: statusSelector new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchData();
      }
    });
  }
  subscribeForSelectedYearPeriod() {
    this.subscription = this.selectedYearPeriod$.subscribe((message) => {
      this.selectedYearPeriod = message;
      console.log('************NGXS: statusSelector new selectedYearPeriod received' + this.selectedYearPeriod);
      this.fetchData();
    });
  }

  fetchData() {
    if (
      this.studentGUId &&
      this.studentGUId !== undefined &&
      this.studentGUId !== '0000' &&
      this.selectedYearPeriod !== ''
    ) {
      this.isLoading = true;
      this.quarterlyData.getQRMiniForStudentPeriod(this.studentGUId, this.selectedYearPeriod).subscribe(
        (data) => {
          this.qrMini = data;
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          if (this.qrMini) {
            console.log('### after retreiving, grid to data ' + this.qrMini.quarterlyReportGUId);
          } else {
            console.log('no results returned');
          }
        }
      );
    }
  }

  setStatusForQR(statusId: number) {
    console.log('selected reviewedStatusId: ' + statusId);
    console.log('current RQGUID:' + this.qrMini.quarterlyReportGUId);

    this.quarterlyData.setQRReviewedStatus(this.qrMini.quarterlyReportGUId, statusId).subscribe(
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
