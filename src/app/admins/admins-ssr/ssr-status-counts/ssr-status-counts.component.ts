import { Component, Input, OnChanges } from '@angular/core';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentReportsStatusCount } from 'src/app/_shared/models/student-reports-status-count';

@Component({
  selector: 'app-ssr-status-counts',
  templateUrl: './ssr-status-counts.component.html'
})
export class SSRStatusCountsComponent implements OnChanges {
  @Input() year: string;
  @Input() period: string;
  statusCounts: StudentReportsStatusCount[];
  errorMessage: string;

  constructor(private ssrData: StudentSelfReportDataService) {}

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
    console.log('ngOnChanges has fired, calling data service with ');
    console.log(this.year);
    console.log(this.period);
    if (+this.period > 0) {
      this.ssrData.getStudentSelfReportsStatusCounts(this.year, this.period).subscribe(  // mentorReportsData.getMentorReportsStatusCounts(this.year, this.month).subscribe(
        (data) => {
          this.statusCounts = data;
          console.log('getStatusCounts returns: ');
          console.log(this.statusCounts);
        },
        (err) => console.error('Subscribe error: ' + err),
        () => {
          console.log('statusCounts loaded ' + this.statusCounts.length + ' rows');
        }
      );
    }
  }
}
