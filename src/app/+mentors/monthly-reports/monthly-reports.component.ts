import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
import { RptMentorReport } from '../../app_shared/models/mentor-report';

@Component({
  moduleId: module.id,
  templateUrl: './monthly-reports.component.html',
})

export class MonthlyReportsComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;

  studentId: number;
  mentorId: number;
  mentorReports: Array<RptMentorReport>;
  smileys: Array<string>;
  studentName: string;

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              public session: SessionService) {

    console.log('monthlyReports constructor');
    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

 ngOnInit() {
        console.log('monthlyReports ngOnInit');
        this.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.mentorId = this.session.getUserId();
        console.log('mentorId ' + this.mentorId);
        // may be undefined at this point:
        console.log('studentId ' + this.studentId);
        this.isLoading=true;
;
  }
  onSelectedStudentName(studentName: string) {
    // console.log('$$$$$$$ got selected NAME event');
    this.studentName = '' + studentName;
  }

  onSelectedStudentId(studentId: number) {
    console.log('$$$$$$$ got selectedId event');
    this.studentId = studentId;
    this.sqlResource.getMentorReportDTOs(this.mentorId, studentId)
      .subscribe(
        data => {this.mentorReports = data;},
        err => console.error('Subscribe error: ' + err),
        () => {console.log('done: ');
         this.isLoading = false;
        }
      );
  }


  monthlyReportAdd() {
    console.log('in monthly-reports: monthlyReportAdd, ready to navigate');
    if (this.studentId !== null) {
     let target = '/mentors/monthly-reports-add/' + this.mentorId + '/' + this.studentId;
      this.router.navigateByUrl(target);//, //{mentorId: this.mentorId, studentId: this.studentId}]);
    }
  }
}
