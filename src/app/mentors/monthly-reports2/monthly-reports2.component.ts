import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/services/mentor-report2-data.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { constants } from '../../_shared/constants/constants';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

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
  mentorGUId: string;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  smileys: Array<string>;
  studentName: string;
  haveCurrentReport: boolean;
  private subscription: Subscription;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReport2Data: MentorReport2DataService,
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
    this.mentorGUId = this.session.getUserGUId();
    console.log('mentorGUId ' + this.mentorGUId);

    // // may be undefined at this point:
    // console.log('studentId ' + this.studentId);


    this.haveCurrentReport = false;

    // console.log('(((((((((((((((((MR ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds();
  }

  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{MR ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    this.subscription.unsubscribe();
  }

  subscribeForStudentGUIds() {
    // console.log('MR set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      .subscribe(message => {
        this.studentGUId = message;
        console.log('MR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
      });
  }


  fetchData() {

    console.log('mr fetchData');
    this.isLoading = true;
    this.isLoading = true;
    this.haveCurrentReport = false;
    this.mentorReport2Data.getMentorReport2RPTsViaGUID(this.mentorGUId, this.studentGUId)
      .subscribe(
        data => { this.mentorReports2 = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done: ');
          this.isLoading = false;
          for (const x of this.mentorReports2) {
            if (x.reviewedStatusId === 2087) { // Needs_Review
              // console.log('current report found; disable add function');
              // this.haveCurrentReport = true;
            }
          }

        }
      );
  }

  monthlyReportAdd() {
    if (this.haveCurrentReport) {
      alert('There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. ');
    } else {
      console.log('in monthly-reports: monthlyReportAdd, ready to navigate');
      if (this.studentGUId !== null) {
        const link = ['/mentors/monthly-reports-add', {
          mentorId: this.mentorId,
          mentorGUId: this.mentorGUId,
          studentGUId: this.studentGUId,
          studentName: this.mentorReports2[0]?.studentName
        }];
        console.log('navigating to ' + JSON.stringify(link));
        this.router.navigate(link);
      }
    }
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target);
    }
  }
}
