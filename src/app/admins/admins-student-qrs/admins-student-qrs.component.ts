import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { SessionService } from '../../_shared/services/session.service';
@Component({
  selector: 'app-admins-student-qrs',
  templateUrl: './admins-student-qrs.component.html'
})
export class AdminsStudentQRsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  studentGUId: string;
  studentName: string;

  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentName) currentStudentName$: Observable<string>;
  @Select(StudentState.getSelectedStudentGUId) currentStudentGUId$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    public session: SessionService,
    public location: Location
  ) {}

  ngOnInit() {
    console.log('admins QRs ngOnInit');
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.studentName = 'unset';
    this.subscription = this.currentStudentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: admins-student-qrs new StudentName received' + this.studentName);
    });
  }

  gotoQR() {
    if (this.studentGUId !== '0000') {
      const link = [ 'quarterly/edit' ];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}
