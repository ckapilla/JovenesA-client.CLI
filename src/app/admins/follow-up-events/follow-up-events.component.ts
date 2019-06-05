import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { FollowUpEventRPT } from '../../app_shared/models/follow-up-eventRPT';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

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

  constructor(public sqlResource: SqlResource,
    public router: Router,
    public session: SessionService
  ) {

    this.followUpStatuses = [
      { value: '0', label: '[All]' },
      { value: '2091', label: 'Evented' },
      { value: '2092', label: 'Assigned' },
      { value: '2104', label: 'Closed' }
    ];
  }

  ngOnInit() {

    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for FollowUpEvents');
    this.sqlResource.getFollowUpEvents(1001)
      .subscribe(
        data => { this.followUpEvents = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done >>'); console.log(this.followUpEvents[0]); console.log('<<');
          this.isLoading = false;
        }
      );
  }

  followUpEventAdd() {
    console.log('in follow-up-events: FollowUpEventAdd, ready to navigate');
    const target = '/admins/follow-up-events-add';
    this.router.navigateByUrl(target);
  }

  gotoFollowUpUpdate(id: number) {
    const link = ['/admins/follow-up-events/follow-up-events' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
}

