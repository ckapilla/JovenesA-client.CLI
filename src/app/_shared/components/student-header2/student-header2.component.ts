import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student2-header',
  templateUrl: './student-header2.component.html'
})
export class StudentHeader2Component implements OnInit {
  private subscription: Subscription;
  public studentGUId: string;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor(
    public router: Router // private selectedStudent: SelectedStudent
  ) {
    console.log('hi from student-header constructor');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header2 new StudentGUId received' + this.studentGUId);
    });
  }
}
