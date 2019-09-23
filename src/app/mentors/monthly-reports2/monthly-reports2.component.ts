import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../app_shared/constants/constants';
import { MentorReport2RPT } from '../../app_shared/models/mentor-report2';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({

  templateUrl: './monthly-reports2.component.html',
})

export class MonthlyReports2Component implements OnInit {

  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  mentorId: number;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  smileys: Array<string>;
  studentName: string;
  haveCurrentReport: boolean;
  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public session: SessionService) {

    console.log('monthlyReports constructor');
    this.smileys = constants.smileys;
  }

  ngOnInit() {
    console.log('monthlyReports ngOnInit');
    this.mentorId = this.currRoute.snapshot.params['mentorId'];
    this.mentorId = this.session.getUserId();
    console.log('mentorId ' + this.mentorId);
    // may be undefined at this point:
    console.log('studentId ' + this.studentId);
    this.haveCurrentReport = false;
  }
  onSelectedStudentName(studentName: string) {
    console.log('$$$$$$$ got selected NAME event');
    this.studentName = '' + studentName;
    this.session.setStudentInContextName(studentName);
  }

  onSelectedStudentId(studentId: number) {
    console.log('$$$$$$$ got selectedId event');
    this.isLoading = true;
    this.haveCurrentReport = false;
    this.studentId = studentId;
    this.sqlResource.getMentorReport2RPTs(this.mentorId, studentId)
      .subscribe(
        data => { this.mentorReports2 = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done: ');
          this.isLoading = false;
          for (const x of this.mentorReports2) {
            if (x.reviewedStatusId === 2086) { // Needs_Setup
              // console.log('current report found; disable add function');
              this.haveCurrentReport = true;
            }
          }

        }
      );
  }

  // onSelectedStudentGUId(studentGUId: string) {
  //   console.log('$$$$$$$ got selectedGUId event with ' + studentGUId);
  //   this.isLoading = true;
  //   this.haveCurrentReport = false;
  //   this.studentGUId = studentGUId;
  //   this.sqlResource.getMentorReport2RPTs(this.mentorId, studentGUId)
  //     .subscribe(
  //       data => { this.mentorReports2 = data; },
  //       err => console.error('Subscribe error: ' + err),
  //       () => {
  //         console.log('done: ');
  //         this.isLoading = false;
  //         for (const x of this.mentorReports2) {
  //           if (x.reviewedStatusId === 2086) { // Needs_Setup
  //             // console.log('current report found; disable add function');
  //             this.haveCurrentReport = true;
  //           }
  //         }

  //       }
  //     );
  // }



  monthlyReportAdd() {
    if (this.haveCurrentReport) {
      alert('There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. ');
    } else {
      console.log('in monthly-reports: monthlyReportAdd, ready to navigate');
      if (this.studentId !== null) {
        const target = '/mentors/monthly-reports-add/' + this.mentorId + '/' + this.studentId;
        this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
      }
    }
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
    }
  }
}
