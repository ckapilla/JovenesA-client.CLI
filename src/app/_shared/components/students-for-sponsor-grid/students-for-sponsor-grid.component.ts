import { Component, OnInit } from '@angular/core';
import { constants } from '../../constants/constants';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';
import { StudentDataService } from '../../services/student-data.service';
import { StudentSelectedService } from '../../services/student-selected.service';

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

  constructor(public session: SessionService,
    private studentData: StudentDataService,
    private studentSelected: StudentSelectedService) {
    this.emojis = constants.emojis;

    console.log('in StudentsForMentorGridComponent constructor');
  }

  public ngOnInit() {
    this.studentData.getStudentsForSponsorByGUId(this.session.getUserGUId())
      .subscribe(
        data => {
          this.students = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('studentsForSponsorGrid has All students: ' + this.students.length);
          console.log(this.students);
          if (this.students.length > 0) {
            this.selectFirstRow();
          } else {
            this.errorMessage = 'No students are assigned at this time. / No hay estudiantes asignado en este momento';
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
    const studentName: string = this.students[idx].studentName;
    this.studentGUId = studentGUId;
    this.studentSelected.notifyNewStudentGUId(studentGUId);
  }

  public setRowClasses(studentGUId: string) {
    const classes = {
      'table-success': studentGUId === this.studentGUId,
      'student-row': true,
      'clickable': true
    };
    return classes;
  }
}
