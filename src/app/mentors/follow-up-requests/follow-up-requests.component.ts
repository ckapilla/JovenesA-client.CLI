import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FollowUpDataService } from 'src/app/app_shared/services/follow-up-data.service';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected.service';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../app_shared/models/follow-up-requestRPT';
import { SessionService } from '../../app_shared/services/session.service';

@Component({
  selector: 'app-follow-up-requests',
  templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit, OnDestroy {
  followUpRequests: FollowUpRequestRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  studentId: number;
  studentGUId: string;
  mentorId: number;
  studentName: string;
  haveData = false;
  private subscription: Subscription;


  constructor(public followUpData: FollowUpDataService,
    public router: Router,
    public session: SessionService,
    private studentSelected: StudentSelectedService
  ) { }

  ngOnInit() {
    console.log('followUpRequest ngOnInit');
    // this.mentorId = this.currRoute.snapshot.params['mentorId'];
    this.mentorId = this.session.getUserId();
    console.log('mentorId ' + this.mentorId);

    // console.log('(((((((((((((((((Assistance ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds();
    // console.log('after subscribe' + this.studentSelected.getInternalSubject().observers.length);

  }
  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{Assistance ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    // this.studentSelected.unsubscribe();
    this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    // console.log('Assistance set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('MR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData(this.studentGUId);
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  fetchData(studentGUId: string) {
    this.isLoading = true;
    this.studentGUId = studentGUId;
    console.log('in fetchData for Assistance with studentId' + this.studentGUId);
    this.followUpData.getFollowUpRequestsForStudentByGUID(this.studentGUId)
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
    if (this.studentGUId !== null) {
      const link = ['/mentors/follow-up-requests-add', { mentorId: this.mentorId, studentGUId: this.studentGUId }];
      console.log('navigating to ' + JSON.stringify(link));
      this.router.navigate(link);
    }
  }
}
