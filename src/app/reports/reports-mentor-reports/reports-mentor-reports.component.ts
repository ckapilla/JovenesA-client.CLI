import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { LatestMentorReports } from '../shared/report-models/latest-mentor-reports';
import { SqlReports } from '../shared/services/sql-reports';

@Component({

  templateUrl: 'reports-mentor-reports.component.html'
})
export class ReportsMentorReportsComponent implements OnInit {
    latestMentorReports: LatestMentorReports[];
  isLoading: boolean;
  smileys: Array<string>;
  errorMessage: string;
  successMessage: string;

  constructor(public sqlReports: SqlReports,
              public router: Router,
              public session: SessionService



  ) {
    this.smileys = [ '/assets/images/needsAttention.jpg',
                    '/assets/images/thumbsUp.jpg',
                    '/assets/images/celebrate.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for LatestMentorReports');
    this.sqlReports.getLatestMentorReports()
      .subscribe(
        data => {this.latestMentorReports = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); console.log(this.latestMentorReports[0]); this.isLoading = false; }
      );
  }
  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    const link = ['/admins/students/student/' + id];
    // const link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoMentorReport(id: number) {
    const link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
