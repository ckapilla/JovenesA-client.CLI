
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpRequestRPT } from '../../models/follow-up-requestRPT';

@Component({
  selector: 'app-follow-up-requests-list',
  templateUrl: './follow-up-requests-list.component.html'
})
export class FollowUpRequestsListComponent {

  @Input()
  followUpRequests: FollowUpRequestRPT[];
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

}
