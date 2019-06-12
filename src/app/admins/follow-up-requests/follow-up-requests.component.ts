import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../app_shared/models/follow-up-requestRPT';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-follow-up-requests',
  styleUrls: ['./follow-up-requests.component.css'],
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit {
  followUpRequests: FollowUpRequestRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  studentName: string;
  displayCompleteHistory: true;


  constructor(public sqlResource: SqlResource,
    public router: Router,
    public session: SessionService
  ) {

    this.followUpStatuses = [
      { value: '0', label: '[All]' },
      { value: '2091', label: 'Requested' },
      { value: '2092', label: 'Assigned' },
      { value: '2104', label: 'Closed' }
    ];
  }

  ngOnInit() {

    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for FollowUpRequests');
    this.sqlResource.getFollowUpRequests()
      .subscribe(
        data => { this.followUpRequests = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done >>'); console.log(this.followUpRequests[0]); console.log('<<');
          this.isLoading = false;
        }
      );
  }

  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    const link = ['admins/students/student', { id: id }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/admins/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }

  viewAddDetails(requestId: number) {
    const link = '/admins/follow-up-events-add/' +  requestId;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }
}

