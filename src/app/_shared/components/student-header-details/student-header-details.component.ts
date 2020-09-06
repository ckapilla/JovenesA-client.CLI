import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentDataService } from '../../data/student-data.service';
import { StudentHeaderDTO } from '../../models/studentHeaderDTO';
import { SessionService } from '../../services/session.service';

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
  // firstNames: string;
  // lastNames: string;

  student: StudentHeaderDTO;
  photoPathName: string;
  studentGUId: string;
  @Output() onPhotoPathNameSet = new EventEmitter<string>();
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public studentData: StudentDataService,
    public location: Location
  ) {
    console.log('hi from StudentHeaderDetails constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    // console.log('StudentHeaderDetails ngOnInit');
    // this.fetchStudentDTOData();
    this.loadingState = 0;
    // this.subscribeForStudentGUIds();

    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchData();
      }
    });
  }

  fetchData() {
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
        this.photoPathName = this.student.photoUrl;
        // console.log('StudentHeaderDetails: emitting photo path: ' + this.photoPathName);
        this.onPhotoPathNameSet.emit(this.photoPathName);
      }
    );
  }

  // public ngOnChanges(changes: SimpleChanges) {
  //   if (changes.studentGUId) {
  //     console.log('studentHeaderDetails changes has studentGUId:' + this.studentGUId);
  //     this.fetchData();
  //   }
  // }
}
