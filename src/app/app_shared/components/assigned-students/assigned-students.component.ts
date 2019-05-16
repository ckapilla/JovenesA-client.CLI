import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { RptStudentMentor } from '../../models/student-mentor';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'assigned-students',
  templateUrl: './assigned-students.component.html'
})

export class AssignedStudentsComponent implements OnInit {
  studentMentors: Array<RptStudentMentor>;
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
        data => {this.studentMentors = data; console.log(this.studentMentors); },
        err => console.error('Subscribe error: ' + err),
        () => {
                console.log('assigned-students loaded ' + this.studentMentors.length + ' rows');
                if (this.studentMentors.length > 0 ) {
                  this.selectFirstRow();
                } else {
                  this.errorMessage = 'No Assigned Students for this mentor.';
                  // this.onNoAssignedStudents.emit();
                }
              }
      );
  }

  selectFirstRow() {
      console.log('First row Id is ' + this.studentMentors[0].studentId  +  ' ' +
              this.studentMentors[0].studentFirstNames + ' ' + this.studentMentors[0].studentLastNames );
      this.setRowClasses(+this.studentMentors[0].studentId );
      this.selectStudent(+this.studentMentors[0].studentId , 0);
  }

  public selectStudent(studentId: number, idx: number) {
    console.log('student selected studentId: ' + studentId + 'idx: ' + idx );
    const studentName: string = this.studentMentors[idx].studentLastNames + ', ' + this.studentMentors[idx].studentFirstNames;
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
