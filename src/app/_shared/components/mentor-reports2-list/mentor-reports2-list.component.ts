import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../constants/constants';
import { MentorReport2RPT } from '../../models/mentor-report2';

@Component({
  selector: 'app-mentor-reports2-list',
  templateUrl: './mentor-reports2-list.component.html'
})
export class MentorReports2ListComponent {
  @Input()
  mentorReports2: MentorReport2RPT[];
  smileys: Array<string>;
  studentId: number;

  constructor(private router: Router) {
    console.log('###MentorReportsList constructor');
    this.smileys = constants.smileys;
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports2: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target);
    }
  }
}
