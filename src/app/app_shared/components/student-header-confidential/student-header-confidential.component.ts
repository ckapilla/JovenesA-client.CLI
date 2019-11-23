import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentSelectedService } from '../../services/student-selected.service';

@Component({
  selector: 'app-student-header-confidential',
  templateUrl: './student-header-confidential.component.html'
})
export class StudentHeaderConfidentialComponent implements OnInit, OnDestroy {


  photoPathName: string;
  private subscription: Subscription;
  public studentGUId: string;

  constructor(
    public router: Router,
    private studentSelected: StudentSelectedService
  ) {
    console.log('hi from student-header constructor');

  }

  ngOnInit() {
    console.log('StudentHeader ngOnInit');
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
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }




}
