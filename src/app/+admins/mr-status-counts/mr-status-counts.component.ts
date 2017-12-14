import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MentorReportsStatusCount } from '../../app_shared/models/mentor-reports-status-count';
import { SqlResource } from '../../app_shared/services/sql-resource';

@Component({
  moduleId: module.id,
  selector: 'app-status-counts',
  templateUrl: './mr-status-counts.component.html'
})

export class MentorReportsStatusCountsComponent implements OnInit {
  statusCounts: Array<MentorReportsStatusCount>;
  errorMessage: string;
  year: string;
  month: string;


  constructor( private sqlResource: SqlResource) {
  }

  public ngOnInit() {
    this.year = '2017';
    this.month = '10';

    this.sqlResource.getMentorReportsStatusCounts(this.year, this.month)
      .subscribe(
        data => {
            this.statusCounts = data; console.log(this.statusCounts);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
                console.log('assigned-students loaded ' + this.statusCounts.length + ' rows');
              }
      );
  }

}
