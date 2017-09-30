import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Student } from '../../app_shared/models/student';

@Component({
  moduleId: module.id,
  selector: 'student-profile',
  templateUrl: './admins-student.component.html',
  styleUrls:  ['./admins-student.component.css'],
})
export class AdminsStudentComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  statuses: [{statusId: string, label: string}];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  student: Student;
  ////studentId: number;

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              public formBuilder: FormBuilder,
              private location: Location
              ) {
    console.log('hi from profile.component constructor');
    this.statuses = [
      { statusId: '1024', label: 'None' },
      { statusId: '1025', label: 'Basic' },
      { statusId: '1026', label: 'Intermediate' },
      { statusId: '1027', label: 'Advanced' },
      { statusId: '1028', label: 'Native' },
    ];

    this.profileForm = formBuilder.group({
      inputStudentFName: ['', Validators.compose(
                  [Validators.required,Validators.maxLength(30)])],
      inputStudentLName: ['',Validators.compose(
                  [Validators.required,Validators.maxLength(30)])],
      inputStudentPhone: ['',Validators.compose(
                  [Validators.required,Validators.minLength(7), Validators.maxLength(12)])],
      inputInitialInterview: ['',Validators.maxLength(2000)],
      inputStudentStory: ['',Validators.maxLength(2000)],
      EnglishLevelSelector: [''],
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
        data => {this.student = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('getStudent is done');
                this.isLoading = false; }
      );

      this.profileForm.valueChanges.subscribe(
          (form: any) => {  this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
          }
      );
  }

  saveProfile(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.sqlResource.updateStudent(this.student)
        .subscribe(
            (student) => {
                // console.log('subscribe result in updateStudent');
                // need timeout to avoid "Expression has changed error"
                window.setTimeout( () => {
                this.successMessage = 'Changes were saved successfully.'; }, 0);
                // this.successMessage = 'Changes were saved successfully.';
                this.submitted = true;
                this.isLoading = false;
                window.scrollTo(0,0);
                window.setTimeout( () => {// console.log('clearing success message');
                              this.successMessage = '';}, 3000);
             },
            (error) =>  {
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
    // tslint:disable-next-line:comment-format
    this.router.navigate(['/admins/students/mentorReports/' + id  + '/']); //this.studentId ]);
  };

  public hasChanges() {
      // if have changes then ask for confirmation
      // ask if form is dirty and has not just been submitted
      console.log('hasChanges has submitted ' + this.submitted);
      console.log('hasChanges has form dirty ' + this.profileForm.dirty);
      console.log('hasChanges net is ' + this.profileForm.dirty  || this.submitted);
      return this.profileForm.dirty && !this.submitted;
  }

  gotoGradeHistory() {
    const id = this.currRoute.snapshot.params['id'];
    const link = ['/admins/students/grade-history/' + id + '/'];
    this.router.navigate(link);
  }
}
