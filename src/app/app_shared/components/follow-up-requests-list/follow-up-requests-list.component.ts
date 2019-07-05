
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
  smileys: Array<string>;
  studentId: number;



  constructor(               private router: Router ) {
    console.log('FollowUpRequestsListComponent constructor');
    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
    }
  }
  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/admins/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }
  viewAddDetails(requestId: number) {
    const link = '/admins/follow-up-events-add/' +  requestId;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  gotoStudent(id: number, studentName: string) {
    // console.log('setting studentName to ' + studentName);
    // this.session.setStudentInContextName(studentName);

    const link = ['admins/students/student', { id: id }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

}
