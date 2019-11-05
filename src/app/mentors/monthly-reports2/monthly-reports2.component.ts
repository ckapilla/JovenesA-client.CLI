import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected-service';
import { constants } from '../../app_shared/constants/constants';
import { MentorReport2RPT } from '../../app_shared/models/mentor-report2';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-mentor-reports',
  templateUrl: './monthly-reports2.component.html',
})

export class MonthlyReports2Component implements OnInit, OnDestroy {

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
  private subscription: Subscription;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public session: SessionService,
    private studentSelected: StudentSelectedService
  ) {

    console.log('monthlyReports constructor');
    this.smileys = constants.smileys;
  }

  ngOnInit() {
    console.log('monthlyReports ngOnInit');
    // this.mentorId = this.currRoute.snapshot.params['mentorId'];
    this.mentorId = this.session.getUserId();
    console.log('mentorId ' + this.mentorId);

    // // may be undefined at this point:
    // console.log('studentId ' + this.studentId);


    this.haveCurrentReport = false;

    // console.log('(((((((((((((((((MR ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds();
    // console.log('after subscribe' + this.studentSelected.getInternalSubject().observers.length);

  }

  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{MR ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    // this.studentSelected.unsubscribe();
    this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    console.log('MR set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('MR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData(this.studentGUId);
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }


  fetchData(studentGUId: string) {

    console.log('mr fetchData');
    this.isLoading = true;
    this.isLoading = true;
    this.haveCurrentReport = false;
    this.sqlResource.getMentorReport2RPTsViaGUID(this.mentorId, studentGUId)
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

  // onSelectedStudentName(studentName: string) {
  //   console.log('$$$$$$$ got selected NAME event');
  //   this.studentName = '' + studentName;
  //   this.session.setStudentInContextName(studentName);
  // }

  // onSelectedStudentId(studentId: number) {
  //   console.log('$$$$$$$ got selectedId event');
  //   this.isLoading = true;
  //   this.haveCurrentReport = false;
  //   this.studentId = studentId;
  //   this.sqlResource.getMentorReport2RPTs(this.mentorId, studentId)
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
