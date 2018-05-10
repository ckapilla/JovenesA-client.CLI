import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { Student } from '../../app_shared/models/student';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({

  // selector: 'student-profile',
  templateUrl: './students-profile.component.html',
  styleUrls:  ['./students-profile.component.css'],
})
export class StudentsProfileComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  statuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  student: Student;

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              public formBuilder: FormBuilder
              ) {
    console.log('hi from profile.component constructor');
    this.statuses = [
      { value: '1024', label: 'Nada' },
      { value: '1025', label: 'Principiante' },
      { value: '1026', label: 'Intermedio' },
      { value: '1027', label: 'Avanzado' },
      { value: '1028', label: 'Nativo' },
    ];

    this.profileForm = formBuilder.group({
      inputStudentFName: ['', Validators.required],
      inputStudentLName: ['', Validators.required],
      inputStudentPhone: ['', Validators.required],
      // inputMonthsinSma: ['',Validators.required],
      // SpanishLevelSelector: ['',Validators.required],
      EnglishLevelSelector: ['', Validators.required],
    });
    this.student = new Student();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.currRoute.params
    //   .map(params => params['id'])
    //   .subscribe((id) => {
    const id = this.currRoute.snapshot.params['id'];
    console.log('stdudentsProfile with studentId: ' + id);
    this.isLoading = true;
    this.sqlResource.getStudent(id)
      .subscribe(
        data => {this.student = data; },
        err => console.error('Subscribe error: ' + err),
        () => {console.log('done loading');
              this.isLoading = false;
              }
      );

      this.profileForm.valueChanges.subscribe(
          (form: any) => {
                            // this.errorMessage = '';
                            // this.successMessage = '';
                            this.submitted = false;
          }
      );
  }

  saveProfile(): boolean {
    console.log('saving ');
        this.sqlResource.updateStudent(this.student)
        .subscribe(
            (student) => {
                this.successMessage = 'Changes were saved successfully.';
                this.submitted = true;
                this.isLoading = false;

                window.scrollTo(0, 0);
                window.setTimeout( () => {this.successMessage = ''; }, 3000);
             },
            (error) =>  {
                console.log(this.errorMessage = <any>error);
                this.isLoading = false;
            }
        );
      // prevent default action of reload
      return false;
  }

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty  || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    }

}
