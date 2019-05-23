import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'students-for-sponsor-list',
  templateUrl: './students-for-sponsor-list.html'
})

export class StudentsForSponsorComponent implements OnInit {
  studentsForSponsor: Array<StudentSponsorXRef>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;

  constructor(public session: SessionService,
    private sqlResource: SqlResource,
    private router: Router,
    private currRoute: ActivatedRoute) {

    console.log('in SponsoredStudents constructor');
  }

  public ngOnInit() {
    this.haveData = false;
    const id = this.currRoute.snapshot.params['id'];
    this.sqlResource.getStudentsForSponsor(id)
      .subscribe(
        data => {this.studentsForSponsor = data; console.log(this.studentsForSponsor); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('students-for-sponsor-list loaded ' + this.studentsForSponsor.length + ' rows');
          if (this.studentsForSponsor.length > 0) {
            console.log(this.studentsForSponsor[0].studentName);
            this.haveData = true;
          } else {
            //
          }
        });
  }
  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}