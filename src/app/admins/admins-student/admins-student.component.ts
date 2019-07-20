import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../app_shared/constants/constants';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { Student } from '../../app_shared/models/student';
import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { SponsorsForStudentGridComponent } from '../../app_shared/components/sponsors-for-student-grid/sponsors-for-student-grid.component';
@Component({

  templateUrl: './admins-student.component.html',
  styleUrls: ['./admins-student.component.css'],
})
export class AdminsStudentComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  languageStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  // firstNames: string;
  // lastNames: string;
  student: Student;
  photoPathName: string;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public formBuilder: FormBuilder,
    public location: Location
  ) {
    console.log('hi from profile.component constructor');
    this.languageStatuses = constants.languageStatuses;

    this.profileForm = formBuilder.group({
      inputStudentFName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      inputStudentLName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      inputStudentPhone: ['', Validators.compose(
        [Validators.required, Validators.minLength(7), Validators.maxLength(12)])],
      inputInitialInterview: ['', Validators.maxLength(2000)],
      inputStudentStory: ['', Validators.maxLength(2000)],
      inputMajor: ['', Validators.maxLength(255)],
      EnglishLevelSelector: [''],
      studentStatus: [''],
      yearJoinedJA: [''],
      joinedFrom: [''],
      gradYear: [''],
      gradMonth: [''],
    });
    this.student = new Student();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Student ngOnInit');
    const id = this.currRoute.snapshot.params['id'];
    console.log('sqlResource with StudentId: ' + id);
    this.isLoading = true;
    this.sqlResource.getStudent(id)
      .subscribe(
        data => {
        this.student = data;
          this.photoPathName = '../../../assets/images/StudentPhotos/' + this.student.yearJoinedJa;
          this.photoPathName = this.photoPathName + '/' + this.student.lastNames + ', ' + this.student.firstNames + '.jpg';
          // this.photoPathName = this.photoPathName + '/' + 'CADENA RÍOS, CARLOS ANTONIO.jpg';
          console.log('photoPathName is ' + this.photoPathName);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('getStudent is done now set timeout for scroll');
          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        });

    this.profileForm.valueChanges.subscribe(
      (form: any) => {
      this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
      }
    );
  }

  scrollIntoView() {

    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  saveProfile(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.sqlResource.updateStudent(this.student)
      .subscribe(
        (student) => {
          // console.log('subscribe result in updateStudent');
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          // this.successMessage = 'Changes were saved successfully.';
          this.submitted = true;
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 3000);
        },
        (error) => {
          console.log(this.errorMessage = <any>error);
          this.isLoading = false;
        }
      );
    // prevent default action of reload
    return false;
  }

  backToStudentsList() {
    this.router.navigate(['/admins/students']);
  }

  mentorReportsReview() {
    const id = this.currRoute.snapshot.params['id'];
    this.router.navigate(['/admins/students/student/mentorReports/' + id + '/' + this.student.firstNames + ' ' + this.student.lastNames]);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.profileForm.dirty);
    console.log('hasChanges net is ' + this.profileForm.dirty || this.submitted);
    return this.profileForm.dirty && !this.submitted;
  }

  gotoGradeHistory() {
    const id = this.currRoute.snapshot.params['id'];
    const link = ['/admins/students/grade-history/' + id + '/'];
    this.router.navigate(link);
  }
}
