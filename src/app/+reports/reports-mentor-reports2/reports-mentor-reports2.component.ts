import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { LatestMentorReports2 } from '../shared/report-models/latest-mentor-reports2';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: 'reports-mentor-reports2.component.html',
})
export class ReportsMentorReports2Component implements OnInit {
  latestMentorReports2: LatestMentorReports2[];
  isLoading: boolean;
  smileys: Array<string>;
  mentorReportStatuses: SELECTITEM[];
  sponsorSummaryStatuses: SELECTITEM[];
  selectedSponsorSummaryStatus: string;

  constructor(public sqlReports: SqlReports,
              public router: Router,
              public session: SessionService



  ) {

    // this.sponsorSummaryStatuses = [
    //   { value: '0', label: '[All]' },
    //   { value: '2086', label: 'NeedsReview' },
    //   { value: '2087', label: 'NeedsApproval' },
    //   { value: '2088', label: 'ReadyToSend' },
    //   { value: '2091', label: 'DoNotSent'},
    //   { value: '2089', label: 'Sent'},
    //   { value: '2090', label: 'Skipped'}
    // ];
    // this.selectedSponsorSummaryStatus = this.sponsorSummaryStatuses[1].value;
    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

  ngOnInit() {
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('in fetchData for LatestMentorReports');
    this.sqlReports.getLatestMentorReports2()//this.selectedSponsorSummaryStatus)
      .subscribe(
        data => {this.latestMentorReports2 = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); console.log(this.latestMentorReports2[0]); this.isLoading = false;}
      );
  }

  setSelectedSponsorSummaryStatus(status: string) {
    // console.log('selected status: ' + status);
    this.selectedSponsorSummaryStatus = status;
    this.fetchFilteredData();
  }

  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setAssignedStudentName(studentName);

    let link = ['/admins/students/student/' + id];
    //let link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoMentorReport(id: number) {
    let link = ['/admins/students/mentorReports/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  editSponsorSummary() {
    console.log('in mentor-reports2: sponsorSummaryEdit, ready to navigate');
    //this.studentId = this.session.getAssignedStudentId();
    let target = '/reports/sponsor-summary-edit/' + this.latestMentorReports2[0].mentorReportId;
    this.router.navigateByUrl(target);//, //{mentorId: this.mentorId, studentId: this.studentId}]);

  }
  translationNeeded(lang1: number, lang2: number) : string {
    console.log(lang1, lang2);
    return (lang1 === lang2) ? '' : 'Translation Needed';
  }

}
