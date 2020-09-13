import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpRequestRPT } from '../../models/follow-up-requestRPT';

@Component({
  selector: 'app-follow-up-requests-list',
  templateUrl: './follow-up-requests-list.component.html'
})
export class FollowUpRequestsListComponent {
  @Input() followUpRequests: FollowUpRequestRPT[];
  @Input() displayCompleteHistory: boolean;
  @Input() showAddDetails: boolean;

  studentId: number;

  constructor(private router: Router) {
    console.log('FollowUpRequestsListComponent constructor');
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target);
    }
  }
  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/admins/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }
  viewAddDetails(requestId: number) {
    const link = '/admins/follow-up-events-add/' + requestId;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  gotoStudent(guid: string) {
    // console.log('setting studentName to ' + studentName);
    // this.session.setStudentInContextName(studentName);

    if (guid && guid.length > 0) {
      const link = ['admins/students/student', { guid: guid }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}
