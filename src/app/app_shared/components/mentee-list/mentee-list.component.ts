import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RptStudentMentor } from '../../models/student-mentor';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'mentee-list',
  templateUrl: './mentee-list.component.html'
})

export class MenteeListComponent implements OnInit {
  studentMentors: Array<RptStudentMentor>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;

  constructor(public session: SessionService,
    private sqlResource: SqlResource,
    private router: Router,
    private currRoute: ActivatedRoute) {

    console.log('in MenteeListComponent constructor');
  }

  public ngOnInit() {
    this.haveData = false;
    const id = this.currRoute.snapshot.params['id'];
    this.sqlResource.getStudentsForMentor(id)
      .subscribe(
        data => {this.studentMentors = data; console.log(this.studentMentors); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('mentee-list loaded ' + this.studentMentors.length + ' rows');
          if (this.studentMentors.length > 0) {
            console.log(this.studentMentors[0].studentFirstNames);
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
