import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetPhotoPathname } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentDataService } from '../../data/student-data.service';
import { StudentHeaderDTO } from '../../models/studentHeaderDTO';

@Component({
  selector: 'app-student-header-details',
  templateUrl: './student-header-details.component.html'
})
export class StudentHeaderDetailsComponent implements OnInit {
  data: Object;
  loadingState = 0;
  submitted: boolean;
  bReadOnly = true;

  errorMessage: string;
  successMessage: string;

  student: StudentHeaderDTO;
  studentGUId: string;
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor(private store: Store, public studentData: StudentDataService, public location: Location) {
    console.log('hi from StudentHeaderDetails constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    this.loadingState = 0;
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header details new StudentGUId received' + this.studentGUId);
      this.fetchData();
    });
  }

  fetchData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.loadingState = 1;
      this.studentData.getStudentHeaderDTO(this.studentGUId).subscribe(
        (data) => {
          this.student = data;
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.loadingState = 2;
          this.store.dispatch(new SetPhotoPathname(this.student.photoUrl));
        }
      );
    }
  }
}
