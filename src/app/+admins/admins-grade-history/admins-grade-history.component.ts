import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';

import { RptMentorReport } from '../../app_shared/models/mentor-report';

@Component({
  moduleId: module.id,
  templateUrl: './admins-grade-history.component.html'
})
export class AdminsGradeHistoryComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  studentId: number;
  mentorId: number;
  mentorReports: Array<RptMentorReport>;
  smileys: Array<string>;
  studentName: string;

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private session: SessionService,
              private location: Location
              ) {

    console.log('monthlyReports constructor');
    this.smileys = [];
    this.smileys[0] = '/assets/images/frownSmiley.jpg';
    this.smileys[1] = '/assets/images/neutralSmiley.jpg';
    this.smileys[2] = '/assets/images/greenSmiley.jpg';

  }

  ngOnInit() {
    console.log('ngOnInit');



    this.studentName = this.session.getAssignedStudentName();
    let id = this.currRoute.snapshot.params['id'];
    console.log('sqlResource with studentId: ' + id);
    this.isLoading = true;
    this.sqlResource.getMentorReports(0,id)
      .subscribe(
        data => {this.mentorReports = data;
                this.studentName = this.mentorReports[0].studentName;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
              this.studentName = this.mentorReports[0].studentName;
              console.log('getMentorReports subscribe is done');
              this.isLoading = false;
            }
      );

  }

}
