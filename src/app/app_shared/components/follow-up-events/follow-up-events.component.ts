import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../interfaces/SELECTITEM';
import { FollowUpEventRPT } from '../../models/follow-up-eventRPT';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-follow-up-events',
  templateUrl: './follow-up-events.component.html',
  styleUrls: ['./follow-up-events.component.css']
})
export class FollowUpEventsComponent implements OnInit {
  followUpEvents: FollowUpEventRPT[];
  isLoading: boolean;
  smileys: Array<string>;
  followUpStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  studentName: string;
  displayEventDetails: false;
  @Input() followUpRequestId: number;

  constructor(public sqlResource: SqlResource,
    public router: Router,
    public session: SessionService
  ) { }

  ngOnInit() {

    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for FollowUpEvents with RequestId ' + this.followUpRequestId);
    this.sqlResource.getFollowUpEvents(this.followUpRequestId)
      .subscribe(
        data => { this.followUpEvents = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done >>'); console.log(this.followUpEvents[0]); console.log('<<');
          this.isLoading = false;
        }
      );
  }

  followUpEventAdd(requestId: number) {
    console.log('in follow-up-events: FollowUpEventAdd, ready to navigate');
    const target = '/admins/follow-up-events-add/' + requestId;
    this.router.navigateByUrl(target);
  }

}
