import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SELECTITEM } from '../../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../../_shared/interfaces/SORTCRITERIA';
import { ColumnSortService } from '../../../_shared/services/column-sort.service';
import { ReportsDataService } from '../../../_shared/services/reports-data.service';
import { MentorReportSubmittedCount } from '../report-models/mentor-report-submitted-count';



@Component({
  selector: 'app-misc-reports',
  templateUrl: './mentor-reports-submitted.component.html',
  styleUrls: ['./mentor-reports-submitted.component.css']
})
export class MentorReportsSubmittedComponent implements OnInit {
  reportTypes: SELECTITEM[];
  mentorReportSubmittedCounts: MentorReportSubmittedCount[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  constructor(
    public sqlReports: ReportsDataService,
    private columnSorter: ColumnSortService,
    private router: Router
  ) {
    this.isLoading = false;
  }

  /*
https://plnkr.co/edit/DITVzCSqHHB1uNrTxFit?p=info
*/

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for MentorReportsSubmittedCounts');
    this.isLoading = true;
    this.sqlReports.getMentorReportSubmittedCounts().subscribe(
      data => {
        this.mentorReportSubmittedCounts = data;
        console.log(this.mentorReportSubmittedCounts[0]);
      },
      err => {
        this.errorMessage = err;
      },
      () => {
        console.log('done');
        this.isLoading = false;
      }
    );
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log(
      'parent received sortColumnCLick event with ' + sortCriteria.sortColumn
    );
    return this.mentorReportSubmittedCounts.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

  gotoMember(id: number, memberName: string) {
    console.log('setting memberName to ' + memberName);
    // this.session.setAssignedMemberName(memberName);

    const link = ['/admins/members/member/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
}
