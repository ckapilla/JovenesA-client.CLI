import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';

@Component({
  selector: 'app-student-header-quarterly',
  templateUrl: './student-header-quarterly.component.html'
})
export class StudentHeaderQuarterlyComponent implements OnInit {
  @Output() onStudentGUIdSet = new EventEmitter<boolean>();
  photoPathName: string;
  private subscription: Subscription;
  public studentGUId: string;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor() {
    console.log('hi from student-header constructor');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('?? emit?? ************NGXS: header new StudentGUId received' + this.studentGUId);
    });
  }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }
}
