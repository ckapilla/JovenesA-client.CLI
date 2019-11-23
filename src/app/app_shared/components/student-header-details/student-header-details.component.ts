import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentHeaderDTO } from '../../models/studentHeaderDTO';
import { SessionService } from '../../services/session.service';
import { StudentDataService } from '../../services/student-data.service';
import { StudentSelectedService } from '../../services/student-selected.service';
@Component({
  selector: 'app-student-header-details',
  templateUrl: './student-header-details.component.html',
})
export class StudentHeaderDetailsComponent implements OnInit, OnDestroy {
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


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public studentData: StudentDataService,
    public location: Location,
    private studentSelected: StudentSelectedService
  ) {
    console.log('hi from StudentHeaderDetails constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('StudentHeaderDetails ngOnInit');
    // this.fetchStudentDTOData();
    this.loadingState = 0;
    this.subscribeForStudentGUIds();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  subscribeForStudentGUIds() {
    console.log('header set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('header new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  fetchData() {
    this.loadingState = 1;
    this.studentData.getStudentHeaderDTO(this.studentGUId)
      .subscribe(
        data => {
          this.student = data;
        },
        err => { this.errorMessage = err; },
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
