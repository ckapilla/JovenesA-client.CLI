import { Component, OnInit } from '@angular/core';
import { constants } from '../../constants/constants';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';
import { StudentSelectedService } from '../../services/student-selected-service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'students-for-sponsor-grid',
  templateUrl: './students-for-sponsor-grid.component.html'
})

export class StudentsForSponsorGridComponent implements OnInit {
  students: Array<StudentSponsorXRef>;
  emojis: Array<string> = [];
  studentId: number;
  studentGUId: string;
  errorMessage = '';
  // @Output() onSelectedStudentName = new EventEmitter<string>();
  // @Output() onSelectedStudentId = new EventEmitter<number>();


  constructor(public session: SessionService,
    private sqlResource: SqlResource,
    private studentSelected: StudentSelectedService) {
    this.emojis = constants.emojis;

    console.log('in StudentsForMentorGridComponent constructor');
  }

  public ngOnInit() {
    this.sqlResource.getStudentsForSponsor(this.session.getUserId())
      .subscribe(
        data => {
          this.students = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('studentsForSponsorGrid has All students: ' + this.students.length);
          console.log(this.students);
          // this.students = this.students.filter(s => s.statusId === 1005);
          // console.log('studentsForMentorGrid has Current students: ' + this.students.length);
          if (this.students.length > 0) {
            this.selectFirstRow();
          } else {
            this.errorMessage = 'No students are assigned at this time. / No hay estudiantes asignado en este momento';
            // this.onNoAssignedStudents.emit();
          }
        }
      );
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.students[0].studentId + ' ' +
      this.students[0].studentName); // + ' ' + this.students[0].studentLastNames );
    this.session.setAssignedStudentId(+this.students[0].studentId);
    this.setRowClasses(this.students[0].studentGUId);
    this.selectStudent(this.students[0].studentGUId, 0);
  }

  public selectStudent(studentGUId: string, idx: number) {
    console.log('student selected studentGUId: ' + studentGUId + 'idx: ' + idx);
    // this.session.setAssignedStudentId(studentId);
    const studentName: string = this.students[idx].studentName; //  + ', ' + this.studentMentors[idx].studentFirstNames;
    this.studentGUId = studentGUId;
    // this.onSelectedStudentId.emit(studentId);
    // this.onSelectedStudentName.emit(studentName);
    this.studentSelected.notifyNewStudentGUId(studentGUId);
  }
  public setRowClasses(studentGUId: string) {
    // console.log('row StudentID is ' + studentId);
    // console.log('session Assigned student ID is ' + this.session.getAssignedStudentId());
    const classes = {
      'table-success': studentGUId === this.studentGUId,
      'student-row': true,
      'clickable': true
    };
    return classes;
  }
}
