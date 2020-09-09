import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student-header-quarterly',
  templateUrl: './student-header-quarterly.component.html'
})
export class StudentHeaderQuarterlyComponent implements OnInit {
  private subscription: Subscription;
  public studentGUId: string;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor() {}

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
    });
  }
}
