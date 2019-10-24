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

    console.log('in MentoredStudentComponent constructor XXXXXXXXXXXXXXXXXXXXX');
  }

  public ngOnInit() {
    this.haveData = false;
    const guid = this.currRoute.snapshot.params['guid'];
    this.sqlResource.getStudentsForMentorByGUId(guid)
      .subscribe(
        data => {
          this.students = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('studentsForMentorList has All students: ' + this.students.length);
          if (this.students.length > 0) {
            console.log(this.students[0].studentName);
            console.log(this.students[0].studentGUId);
            this.haveData = true;
          } else {
            //
          }
        });
  }
  gotoStudent(GUId: number, studentName: string) { // }, studentFirstNames: string) {
    // const studentName; // = studentLastNames + ', ' + studentFirstNames;
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);
    const link = 'admins/students/student;guid=' + GUId;

    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }


}
