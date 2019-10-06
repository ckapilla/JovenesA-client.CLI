import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentHeaderDTO } from '../../models/studentHeaderDTO';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';
import { StudentSelectedService } from '../../services/student-selected-service';
@Component({
  selector: 'app-student-header-details',
  templateUrl: './student-header-details.component.html',
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


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public sqlResource: SqlResource,
    public location: Location,
    private studentSelected: StudentSelectedService
  ) {
    console.log('hi from MyForm.component constructor');

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('StudentHeader ngOnInit');
    console.log('sqlResource with studentGUId: ' + this.studentGUId);
    // this.fetchStudentDTOData();
    this.loadingState = 0;
    this.getCurrentStudentGUId();
  }

  getCurrentStudentGUId() {
    console.log('student header details set up studentGUId subscription');
    this.studentSelected.getStudentGUId()
      .subscribe(message => {
        this.studentGUId = message;
        console.log('student header details new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
      });
  }

  fetchData() {
    this.loadingState = 1;
    this.sqlResource.getStudentHeaderDTO(this.studentGUId)
      .subscribe(
        data => {
          this.student = data;
        },
        err => { this.errorMessage = err; },
        () => {
          this.loadingState = 2;
          this.photoPathName = this.student.photoUrl;
          console.log('StudentHeaderDetails: emitting photo path: ' + this.photoPathName);
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
