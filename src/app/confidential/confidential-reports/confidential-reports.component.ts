import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ConfidentialDataService } from 'src/app/_shared/data/confidential-data.service';
import { ConfidentialReportRPT } from 'src/app/_shared/models/confidential-reportRPT';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../_shared/constants/constants';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  selector: 'app-confidential-reports',
  templateUrl: './confidential-reports.component.html'
})
export class ConfidentialReportsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  adminId: number;
  confidentialReportId: number;
  confidentialReports: Array<ConfidentialReportRPT>;
  smileys: Array<string>;
  studentName: string;
  haveCurrentReport: boolean;
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public confidentialReportData: ConfidentialDataService,
    public session: SessionService
  ) {
    console.log('confidentialReports constructor');
    this.smileys = constants.smileys;
  }

  ngOnInit() {
    console.log('confidentialReports ngOnInit');
    // this.mentorId = this.currRoute.snapshot.params['mentorId'];
    this.adminId = this.session.getUserId();
    console.log('mentorId ' + this.adminId);

    // // may be undefined at this point:
    // console.log('studentId ' + this.studentId);

    this.haveCurrentReport = false;

    // console.log('(((((((((((((((((MR ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchData();
      }
    });
  }

  fetchData() {
    console.log('cr fetchData');
    this.isLoading = true;
    this.isLoading = true;
    this.haveCurrentReport = false;
    this.confidentialReportData.getConfidentialReportRPTsViaGUID(0, this.studentGUId).subscribe(
      (data) => {
        this.confidentialReports = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done: ');
        this.isLoading = false;
        for (const x of this.confidentialReports) {
          if (x.reviewedStatusId === 2086) {
            // Needs_Setup
            // console.log('current report found; disable add function');
            this.haveCurrentReport = true;
          }
        }
      }
    );
  }

  confidentialReportAdd() {
    console.log('in confidential-reports: monthlyReportAdd, ready to navigate');
    console.log(this.studentGUId);
    if (this.studentGUId !== null) {
      const link = [
        '/confidential/confidential-reports-add',
        { adminId: this.adminId, studentGUId: this.studentGUId }
      ];
      console.log('navigating to ' + JSON.stringify(link));
      this.router.navigate(link);
    }
  }

  confidentialReportEdit(confidentialReportId: number) {
    console.log('in confidential-reports: confidentialReportEdit, ready to navigate');
    if (this.studentGUId !== null) {
      const target = '/confidential/confidential-reports-edit/' + confidentialReportId;
      this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
    }
  }
}
