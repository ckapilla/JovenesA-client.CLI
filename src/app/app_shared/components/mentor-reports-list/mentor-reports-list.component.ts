
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MentorReportRPT } from '../../models/mentor-report';

@Component({
  selector: 'app-mentor-reports-list',
  templateUrl: './mentor-reports-list.component.html'
})
export class MentorReportsListComponent {

  @Input()
  mentorReports: MentorReportRPT[];
  smileys: Array<string>;
  studentId: number;

  constructor(               private router: Router ) {
    console.log('MentorReportsList constructor');
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
