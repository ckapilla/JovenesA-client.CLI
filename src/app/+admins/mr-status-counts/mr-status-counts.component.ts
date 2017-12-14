import { Component, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { MentorReportsStatusCount } from '../../app_shared/models/mentor-reports-status-count';
import { SqlResource } from '../../app_shared/services/sql-resource';

@Component({
  moduleId: module.id,
  selector: 'app-status-counts',
  templateUrl: './mr-status-counts.component.html'
})

export class MentorReportsStatusCountsComponent implements OnChanges {
  @Input() year: string;
  @Input() month: string;
  statusCounts: MentorReportsStatusCount[];
  errorMessage: string;

  constructor( private sqlResource: SqlResource) {
  }

  public ngOnChanges() {

    // this.statusCounts = [{
    //   reportYear: 2017,
    //   reportMonth: 10,
    //   sponsorSummaryStatusId: 2087,
    //   sponsorSummaryStatus: 'NeedsReview',
    //   statusCount: 44
    // }, {
    //     reportYear: 2017,
    //     reportMonth: 10,
    //     sponsorSummaryStatusId: 2088,
    //     sponsorSummaryStatus: 'ReadyToSend',
    //     statusCount: 7
    //   }
    // ];
    console.log('ngOnChanges has fired, calling sqlResource with ');
    console.log(this.year);
    console.log(this.month);
    this.sqlResource.getMentorReportsStatusCounts(this.year, this.month)
      .subscribe(
        data => {
            this.statusCounts = data;
            console.log('getStatusCounts returns: ');
            console.log(this.statusCounts);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
                console.log('statusCounts loaded ' + this.statusCounts.length + ' rows');
              }
      );

  }

}
