import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../_shared/constants/constants';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  selector: 'app-mentor-reports',
  templateUrl: './monthly-reports2.component.html'
})
export class MonthlyReports2Component implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  mentorId: number;
  mentorGUId: string;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  emojis: Array<string>;
  studentName: string;
  haveCurrentReport: boolean;
  private subscription: Subscription;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReport2Data: MentorReport2DataService,
    public session: SessionService,
    private store: Store
  ) {
    console.log('monthlyReports constructor');
    this.emojis = constants.emojis;
  }

  ngOnInit() {
    console.log('monthlyReports ngOnInit');
    this.mentorId = this.session.getUserId();
    console.log('mentorId ' + this.mentorId);
    this.mentorGUId = this.session.getUserGUId();
    console.log('mentorGUId ' + this.mentorGUId);

    this.haveCurrentReport = false; // conditionally set to true after fetch
    this.subscribeForStudentGUIds2();
    this.subscribeForStudentNames();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      if (this.studentGUId !== message) {
        this.studentGUId = message;
        console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
      }
    });
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: mrAdd new StudentName received' + this.studentName);
    });
  }


  fetchData() {
    console.log('mr fetchData');
    this.isLoading = true;
    this.isLoading = true;
    this.haveCurrentReport = false;
    this.mentorReport2Data.getMentorReport2RPTsViaGUID(this.studentGUId, this.mentorGUId).subscribe(
      (data) => {
        this.mentorReports2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done: ');
        this.isLoading = false;
        let i = 0;
        console.log('mentorReports2.length = ' + this.mentorReports2.length);
        for (const x of this.mentorReports2) {
          console.log('reviewedStatusId: ' + x.reviewedStatusId);
          console.log('i = ' + i);
          if (x.reviewedStatusId === 2087 && x.reportDateTime >= new Date('4/3/2024')) {  // Needs_Review, not finalized
            console.log(' report w/ NeedsReview status found; disable add function');
            this.haveCurrentReport = true;
          }
          break; // only want current (first in reverse order)
        }
      }
    );
  }

  monthlyReportENAdd() {
    if (this.haveCurrentReport) {
      alert(
        'There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. '
      );
    } else {
      console.log('actual nonProxy mentorGUId ' + this.mentorGUId);
      if (this.studentGUId !== null) {
        const link = [
          '/mentors/monthly-reports-EN-add',
          {
            mentorId: this.mentorId,
            mentorGUId: this.mentorGUId,
            studentGUId: this.studentGUId
          }
        ];
        console.log('navigating to ' + JSON.stringify(link));
        this.router.navigate(link);
      }
    }
  }

  monthlyReportESAdd() {
    if (this.haveCurrentReport) {
      alert(
        'There is already a report filed for this month. Please use the edit button to edit it. / Ya hay un informe presentado para este mes. Por favor, utilice el botón Editar para editarlo. '
      );
    } else {
          console.log('actual mentorGUId ' + this.mentorGUId);
      if (this.studentGUId !== null) {
        const link = [
          '/mentors/monthly-reports-ES-add',
          {
            mentorId: this.mentorId,
            mentorGUId: this.mentorGUId,
            studentGUId: this.studentGUId
          }
        ];
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
  DoIt() {
    this.haveCurrentReport = !this.haveCurrentReport;
  }

}
