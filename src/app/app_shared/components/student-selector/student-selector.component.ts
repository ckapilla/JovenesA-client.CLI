import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
import { SqlResource } from '../../services/sql-resource.service';
// import { map } from 'rxjs/operators';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-student-selector',
  templateUrl: './student-selector.component.html'
})

export class StudentSelectorComponent implements OnInit {
  students: Array<StudentMiniDTO>;
  errorMessage = '';
  haveData: boolean;
  @Output() onSelectedStudentId = new EventEmitter<number>();
  constructor(
    private sqlResource: SqlResource) {
  }
  public ngOnInit() {
    this.haveData = false;
    this.sqlResource.getCurrentStudentMiniDTOs('')
      .subscribe(
        data => {
          this.students = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('student selector has All students: ' + this.students.length);
          this.students = this.students.filter(s => s.studentName !== 'N/A, N/A');
          console.log('student selector has Current students: ' + this.students.length);
          if (this.students.length > 0) {
            console.log(this.students[0].studentName);
            this.haveData = true;
          } else {
            //
          }
        });
  }
  public setSelectedStudent(studentId: string) {
    console.log('selected studentId is set to ' + studentId);
    this.onSelectedStudentId.emit(+ studentId);
  }
}
