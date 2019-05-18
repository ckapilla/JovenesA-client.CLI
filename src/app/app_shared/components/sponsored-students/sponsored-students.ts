import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RptStudentSponsor } from '../../models/student-sponsor';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'sponsored-students',
  templateUrl: './sponsored-students.html'
})

export class SponsoredStudentsComponent implements OnInit {
  studentsForSponsor: Array<RptStudentSponsor>;
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
          console.log('mentee-list loaded ' + this.studentsForSponsor.length + ' rows');
          if (this.studentsForSponsor.length > 0) {
            console.log(this.studentsForSponsor[0].studentFirstNames);
            this.haveData = true;
          } else {
            //
          }
        });
  }
  gotoStudent(id: number, studentLastNames: string, studentFirstNames: string) {
    const studentName = studentLastNames + ', ' + studentFirstNames;
    console.log('setting studentName to ' +studentName);
    this.session.setStudentInContextName(studentName)
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
