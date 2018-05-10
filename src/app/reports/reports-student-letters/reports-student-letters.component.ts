import { Component, OnInit } from '@angular/core';

import { SqlReports } from '../shared/services/sql-reports';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
import { LatestStudentLetters } from '../shared/report-models/latest-student-letters';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';

import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';

@Component({

  templateUrl: 'reports-student-letters.component.html',
  styleUrls: ['reports-student-letters.css']
})
export class ReportsStudentLettersComponent implements OnInit {
    latestStudentLetters: LatestStudentLetters[];
  isLoading: boolean;
  smileys: Array<string>;
  errorMessage: string;
  successMessage: string;

  constructor(public sqlReports: SqlReports,
              public router: Router,
              public session: SessionService,
              public columnSorter: ColumnSortService
  ) {
    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for LatestStudentLetters');
    this.sqlReports.getLatestStudentLetters()
      .subscribe(
        data => {this.latestStudentLetters = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); console.log(this.latestStudentLetters[0]); this.isLoading = false; }
      );
  }
  // gotoStudent(id: number, studentName: string) {
  //   console.log('setting studentName to ' + studentName);
  //   this.session.setAssignedStudentName(studentName);

  //   const link = ['/admins/students/student/' + id];
  //   //const link = ['/admins/students/StudentLetters/' + id];
  //   console.log('navigating to ' + link);
  //   this.router.navigate(link);
  // }

  gotoStudentLetter(id: number) {
    const link = ['/admins/students/studentLetters/' + id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.latestStudentLetters.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

}
