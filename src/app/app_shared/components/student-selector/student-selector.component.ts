import { Component, OnInit } from '@angular/core';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'app-student-selector',
  templateUrl: './student-selector.component.html'
})

export class StudentSelectorComponent implements OnInit {
  students: Array<StudentMiniDTO>;
  errorMessage = '';
  haveData: boolean;

  constructor(
    private sqlResource: SqlResource) {
  }
  public ngOnInit() {
    this.haveData = false;
    this.sqlResource.getCurrentStudentMiniDTOs()
      .subscribe(
        data => {this.students = data; console.log(this.students); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('student-selector loaded ' + this.students.length + ' rows');
          if (this.students.length > 0) {
            console.log(this.students[0].studentName);
            this.haveData = true;
          } else {
            //
          }
        });
  }

}
