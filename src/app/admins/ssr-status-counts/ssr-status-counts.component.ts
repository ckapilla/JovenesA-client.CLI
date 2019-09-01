import { Component, Input, OnChanges } from '@angular/core';
import { MentorReportsStatusCount } from '../../app_shared/models/mentor-reports-status-count';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({

  selector: 'app-ssr-status-counts',
  templateUrl: './ssr-status-counts.component.html'
})

export class StudentReportsStatusCountsComponent implements OnChanges {
  @Input() year: string;
  @Input() period: string;
  statusCounts: MentorReportsStatusCount[];
  errorMessage: string;

  constructor(private sqlResource: SqlResource) {
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
    console.log('## SSR StatusCounts ngOnChanges has fired, calling sqlResource with ');
    console.log(this.year);
    console.log(this.period);
    this.sqlResource.getStudentSelfReportsStatusCounts(this.year, this.period)
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
