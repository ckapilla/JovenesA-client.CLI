import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html'
})
export class StudentHeaderComponent implements OnInit {
  photoPathName: string;
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
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
    });
  }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }
}
