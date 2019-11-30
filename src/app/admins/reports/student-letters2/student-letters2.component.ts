import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../_shared/services/session.service';
import { LatestStudentLetters2 } from '../shared/report-models/latest-student-letters2';
import { SqlReports } from '../sql-reports';

@Component({
  styleUrls: ['student-letters2.component.css'],
  templateUrl: 'student-letters2.component.html'
})
export class StudentLetters2Component implements OnInit {
  latestStudentLetters2: LatestStudentLetters2[];
  isLoading: boolean;
  smileys: Array<string>;
  errorMessage: string;
  successMessage: string;

  constructor(public sqlReports: SqlReports,
    public router: Router,
    public session: SessionService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for LatestStudentLetters');
    this.sqlReports.getLatestStudentLetters2()
      .subscribe(
        data => { this.latestStudentLetters2 = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); console.log(this.latestStudentLetters2[0]); this.isLoading = false; }
      );
  }

  gotoStudentletter(id: number) {
    const link = ['/admins/students/studentLetters/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
