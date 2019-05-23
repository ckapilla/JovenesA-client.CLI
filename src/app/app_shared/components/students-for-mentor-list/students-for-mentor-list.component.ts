import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'students-for-mentor-list',
  templateUrl: './students-for-mentor-list.component.html'
})

export class StudentsForMentorListComponent implements OnInit {
  students: Array<StudentDTO>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;

  constructor(public session: SessionService,
    private sqlResource: SqlResource,
    private router: Router,
    private currRoute: ActivatedRoute) {

    console.log('in MentoredStudentComponent constructor');
  }

  public ngOnInit() {
    this.haveData = false;
    const id = this.currRoute.snapshot.params['id'];
    this.sqlResource.getStudentsForMentor(id)
      .subscribe(
        data => {this.students = data; console.log(this.students); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('students-for-mentor-list loaded ' + this.students.length + ' rows');
          if (this.students.length > 0) {
            console.log(this.students[0].studentName);
            this.haveData = true;
          } else {
            //
          }
        });
  }
  gotoStudent(id: number, studentName: string) { // }, studentFirstNames: string) {
    // const studentName; // = studentLastNames + ', ' + studentFirstNames;
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName)
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }


}
