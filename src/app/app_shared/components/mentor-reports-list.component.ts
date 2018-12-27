
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RptMentorReport } from '../models/mentor-report';

@Component({
  selector: 'app-mentor-reports-list',
  template: `
  <div class="panel-body">

  <div class="row" style="border-bottom: 3px solid #ccc; margin-top: 2px;"
    *ngFor="let i of mentorReports">
    <div class="col-md-12">
      <div class="row">

        <span class="padded">
          &nbsp;Report Date:
          {{ i.reportDateTime | truncateDate }}
        </span>
        <span class="padded">
          &nbsp;Last Contact Month:

        {{ i.lastContactMonth | alphaMonth}}-{{ i.lastContactYear }}
        </span>
        <span class="padded">
          &nbsp;Student Snapshot:
          <img src="{{smileys[i.mentorReportSnapshot+1]}}" width="24px" />
        </span>
        <span *ngIf="i.sponsorSummaryStatusId==2086" class="padded">
        <span class="btn btn-primary" (click)="monthlyReportEdit(i.mentorReportId )" style="margin-left:10px">
          Edit Report
        </span>
      </span>

      </div>
      <div class="row">
        <div class="padded">
          &nbsp;Follow-up Needed:
        </div>
        <div class="col-md-10">
          {{ i.followUpNeeded }}
        </div>
      </div>
      <div class="row">
        <div class="col-md2 padded">
          &nbsp;Positive Events:
        </div>
        <div class="col-md-10">
          {{ i.recentSuccess }}
        </div>
      </div>
      <div class="row">
        <div class="padded">
          &nbsp;Challenges:
        </div>
        <div class="col-md-10">
          {{ i.recentSetback }}
        </div>
      </div>
    </div>
  </div>
  `
})
export class MentorReportsListComponent {

  @Input()
  mentorReports: RptMentorReport[];
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
