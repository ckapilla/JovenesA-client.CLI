import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { LatestStudentLetters2 } from '../shared/report-models/latest-student-letters2';
@Component({
  moduleId: module.id,
  styleUrls: ['reports-student-letters2.component.css'],
  templateUrl: 'reports-student-letters2.component.html'
})
export class ReportsStudentLetters2Component implements OnInit {
    latestStudentLetters2: LatestStudentLetters2[];
  isLoading: boolean;
  smileys: Array<string>;

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
        data => {this.latestStudentLetters2 = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); console.log(this.latestStudentLetters2[0]); this.isLoading = false;}
      );
  }
  // gotoStudent(id: number, studentName: string) {
  //   console.log('setting studentName to ' + studentName);
  //   this.session.setAssignedStudentName(studentName);

  //   let link = ['/admins/students/student/' + id];
  //   //let link = ['/admins/students/StudentLetters/' + id];
  //   console.log('navigating to ' + link);
  //   this.router.navigate(link);
  // }

  gotoStudentletter(id: number) {
    let link = ['/admins/students/studentLetters/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
