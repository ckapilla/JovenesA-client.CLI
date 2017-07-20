import { Component, OnInit } from '@angular/core';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { MentorReportFollowUp } from '../../app_shared/models/mentor-report-follow-up';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: 'mr-follow-up-tracking.component.html',
})
export class MentorReportsFollowUpTrackingComponent implements OnInit {
  mentorReportsFollowUp: MentorReportFollowUp[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];


  constructor(public sqlResource: SqlResource,
              public router: Router,
              public session: SessionService



  ) {

    this.followUpStatuses = [
      { value: '0', label: '[All]' },
      { value: '2091', label: 'Requested'},
      { value: '2092', label: 'Assigned'},
      { value: '2104', label: 'Closed'}
    ];
    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for MentorReportsFollowUp');
    this.sqlResource.getMentorReportsFollowUpStatus()
      .subscribe(
        data => {this.mentorReportsFollowUp = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done >>'); console.log(this.mentorReportsFollowUp[0]); console.log('<<'); this.isLoading = false;}
      );
  }

  // setSelectedSponsorSummaryStatus(status: string) {
  //   // console.log('selected status: ' + status);
  //   this.selectedSponsorSummaryStatus = status;
  //   this.fetchFilteredData();
  // }

  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setAssignedStudentName(studentName);

    let link = ['/admins/students/student/' + id];
    //let link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoFollowUpUpdate(id: number) {
    let link = ['/admins/mentor-reports/follow-up-updates/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
