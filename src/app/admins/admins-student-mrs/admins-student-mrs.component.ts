import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorReport2DataService } from 'src/app/_shared/services/mentor-report2-data.service';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';
@Component({

  templateUrl: './admins-student-mrs.component.html',
})

export class AdminsStudentMRsComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: number;
  mentorId: number;
  mentorReportId: number;
  mentorReports2: Array<MentorReport2RPT>;
  studentName: string;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    public session: SessionService,
    public location: Location) {
  }

  ngOnInit() {
    console.log('admins MRs ngOnInit');
    //  not here this.mentorId = this.currRoute.snapshot.params['mentorId'];
    this.mentorId = 0; // 2208;
    console.log('mentorId ' + this.mentorId);
    this.studentGUId = this.currRoute.snapshot.params['guid'];
    this.studentName = this.currRoute.snapshot.params['studentName'];
    if (this.studentName === '') {
      this.studentName = this.session.getStudentInContextName();
    }
    console.log('studentGUId  ' + this.studentGUId);
    this.isLoading = true;
    this.mentorReportData.getMentorReport2RPTs(this.mentorId, this.studentGUId)
      .subscribe(
        data => { this.mentorReports2 = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done: ');
          this.isLoading = false;
        }
      );
  }
}
