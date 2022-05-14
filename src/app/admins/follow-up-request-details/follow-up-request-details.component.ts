import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { FollowUpRequestRPT } from '../../_shared/models/follow-up-requestRPT';


@Component({
  selector: 'app-follow-up-request-details',
  templateUrl: './follow-up-request-details.component.html'
})
export class FollowUpRequestDetailsComponent implements OnInit {
  // @Input() followUpRequest: FollowUpRequestRPT;
  // @Input() displayCompleteHistory: boolean;
  // @Input() showAddDetails: boolean;
  @Input() showAddDetails: boolean;
  request = new FollowUpRequestRPT();
  studentId: number;
  followUpRequestId: string;

  constructor(private router: Router,
    public currRoute: ActivatedRoute,
    public followUpData: FollowUpDataService
  ) {
    console.log('FollowUpRequestDetailsComponent constructor');
  }

  ngOnInit() {
    this.followUpRequestId = this.currRoute.snapshot.params['requestId'];
    console.log('calling fetchFilterdData with ' + this.followUpRequestId);
    this.fetchFilteredData(this.followUpRequestId);
  }

  fetchFilteredData(requestId: string) {
    // this.isLoading = true;
    console.log('in fetchFilteredData for FollowUpRequests');
    this.followUpData.getFollowUpRequestRPT(requestId).subscribe(
      (data) => {
        // this.followUpRequest = data;
        this.request = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done >>');
        console.log(this.request);
        console.log('<<');
        // this.isLoading = false;
      }
    );
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
  navigateBack() {
    const link = '/admins/follow-up-requests';
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  gotoStudent(guid: string) {

    if (guid && guid.length > 0) {
      const link = ['admins/students/student-container', { guid: guid }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}
