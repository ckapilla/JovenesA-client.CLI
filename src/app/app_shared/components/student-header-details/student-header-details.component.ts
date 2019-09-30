import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentHeaderDTO } from '../../models/studentHeaderDTO';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';
@Component({
  selector: 'app-student-header-details',
  templateUrl: './student-header-details.component.html',
})
export class StudentHeaderDetailsComponent implements OnInit, OnChanges {
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
  @Input() studentGUId: string;
  @Output() onPhotoPathNameSet = new EventEmitter<string>();


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    public sqlResource: SqlResource,
    public location: Location
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
  }

  fetchStudentDTOData() {
    this.loadingState = 1;
    this.sqlResource.getStudentHeaderDTOViaGUID(this.studentGUId)
      .subscribe(
        data => {
          this.student = data;
        },
        err => { this.errorMessage = err; },
        () => {
          console.log('data loaded set photo path');
          this.loadingState = 2;
          this.photoPathName = + this.student.yearJoinedJa + '/' + this.student.photoUrl;
          this.onPhotoPathNameSet.emit(this.photoPathName);
        }
      );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.studentGUId) {
      console.log('studentHeader changes has studentGUId:' + this.studentGUId);
      this.fetchStudentDTOData();
    }
  }
}
