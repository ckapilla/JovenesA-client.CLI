import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../app_shared/models/follow-up-requestRPT';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-follow-up-requests',
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit {
  followUpRequests: FollowUpRequestRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  studentId: number;
  studentName: string;
  haveData = false;


  constructor(public sqlResource: SqlResource,
    public router: Router,
    public session: SessionService
  ) { }

  ngOnInit() {

  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for mentor  FollowUpRequests with studentId' + this.studentId);
    this.sqlResource.getFollowUpRequestsForStudent(this.studentId)
      .subscribe(
        data => { this.followUpRequests = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done >>'); console.log(this.followUpRequests[0]); console.log('<<');
          this.isLoading = false;
          this.haveData = this.followUpRequests.length > 0;
        }
      );
  }


  followUpRequestAdd() {
    console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
    const target = '/mentors/follow-up-requests-add';
    this.router.navigateByUrl(target);
  }
  onSelectedStudentName(studentName: string) {
    console.log('$$$$$$$ got selected NAME event');
    this.studentName = '' + studentName;
    this.session.setStudentInContextName(studentName);
  }

  onSelectedStudentId(studentId: number) {
    console.log('$$$$$$$ got selectedId event');
    this.studentId = studentId;
    this.fetchData();
  }
}