
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { constants } from '../../constants/constants';
import { ConfidentialReportRPT } from '../../models/confidential-reportRPT';

@Component({
  selector: 'app-confidential-reports-list',
  templateUrl: './confidential-reports-list.component.html'
})
export class ConfidentialReportsListComponent {

  @Input()
  confidentialReports: ConfidentialReportRPT[];
  smileys: Array<string>;
  studentId: number;

  constructor(private router: Router) {
    console.log('###confidentialReportsList constructor');
    this.smileys = constants.smileys;
  }

  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports2: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/confidential/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
    }
  }

}
