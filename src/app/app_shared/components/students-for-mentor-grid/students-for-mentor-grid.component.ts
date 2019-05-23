import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'students-for-mentor-grid',
  templateUrl: './students-for-mentor-grid.component.html'
})

export class StudentsForMentorGridComponent implements OnInit {
  students: Array<StudentDTO>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  @Output() onSelectedStudentName = new EventEmitter<string>();
  @Output() onSelectedStudentId = new EventEmitter<number>();


  constructor(public session: SessionService,
            private sqlResource: SqlResource) {
    this.smileys[0] = 'frownSmiley.jpg';
    this.smileys[1] = 'neutralSmiley.jpg';
    this.smileys[2] = 'greenSmiley.jpg';
    this.smileys[3] = 'NA.jpg';

    console.log('in AssignedStudentsComponent constructor');
    // session.setAssignedStudentId(223);
  }

  public ngOnInit() {
    this.sqlResource.getStudentsForMentor(this.session.getUserId())
      .subscribe(
        data => {this.students = data; console.log(this.students); },
        err => console.error('Subscribe error: ' + err),
        () => {
                console.log('students-for-mentor-grid loaded ' + this.students.length + ' rows');
                if (this.students.length > 0 ) {
                  this.selectFirstRow();
                } else {
                  this.errorMessage = 'No Assigned Students.';
                  // this.onNoAssignedStudents.emit();
                }
              }
      );
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.students[0].studentId + ' ' +
      this.students[0].studentName); // + ' ' + this.students[0].studentLastNames );
      this.setRowClasses(+this.students[0].studentId );
      this.selectStudent(+this.students[0].studentId , 0);
  }

  public selectStudent(studentId: number, idx: number) {
    console.log('student selected studentId: ' + studentId + 'idx: ' + idx );
    const studentName: string = this.students[idx].studentName; //  + ', ' + this.studentMentors[idx].studentFirstNames;
    this.studentId = studentId;
    this.onSelectedStudentId.emit(studentId);
    this.onSelectedStudentName.emit(studentName);

  }
  public setRowClasses(studentId: number) {
    // console.log('row StudentID is ' + studentId);
    // console.log('session Assigned student ID is ' + this.session.getAssignedStudentId());
    const classes =  {
      'success': studentId === this.studentId,
      'student-row': true,
      'clickable': true
    };
    return classes;
  }
}