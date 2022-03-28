import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { FollowUpRequestRPT } from '../../_shared/models/follow-up-requestRPT';


@Component({
  selector: 'app-follow-up-request-details',
  templateUrl: './follow-up-request-details.component.html'
})
export class FollowUpRequestDetailsComponent implements OnInit {
  @Input() followUpRequests: FollowUpRequestRPT[];
  @Input() displayCompleteHistory: boolean;
  @Input() showAddDetails: boolean;

  studentId: number;

  constructor(private router: Router,
    public followUpData: FollowUpDataService
  ) {
    console.log('FollowUpRequestDetailsComponent constructor');
  }

  ngOnInit() {
    console.log('calling fetchFilterdData with ' + 666);
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    // this.isLoading = true;
    console.log('in fetchFilteredData for FollowUpRequests');
    this.followUpData.getFollowUpRequests('666').subscribe(
      (data) => {
        this.followUpRequests = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done >>');
        console.log(this.followUpRequests);
        console.log('<<');
        // this.isLoading = false;
      }
    );
  }
  monthlyReportEdit(mentorReportId: number) {
    console.log('in monthly-reports: monthlyReportEdit, ready to navigate');
    if (this.studentId !== null) {
      const target = '/mentors/monthly-reports-edit/' + mentorReportId;
      this.router.navigateByUrl(target);
    }
  }
  // followUpRequestAdd() {
  //   console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
  //   const target = '/admins/follow-up-requests-add';
  //   this.router.navigateByUrl(target);
  // }
  viewAddDetails(requestId: number) {
    const link = '/admins/follow-up-events-add/' + requestId;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  gotoStudent(guid: string) {
    // console.log('setting studentName to ' + studentName);
    // this.session.setStudentInContextName(studentName);

    if (guid && guid.length > 0) {
      const link = ['admins/students/student-container', { guid: guid }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}
