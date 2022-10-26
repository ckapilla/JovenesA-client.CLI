import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

interface IValidationType {
  [error: string]: boolean | null;
}

@Component({
  templateUrl: './monthly-reports2-EN-add.component.html'
})
export class MonthlyReports2ENAddComponent implements OnInit {
  myForm: FormGroup;
  mentorReport2: MentorReport2RPT = new MentorReport2RPT();
  isLoading: boolean;
  isSubmitted = false;

  lastYearCtl: AbstractControl;
  lastMonthCtl: AbstractControl;
  emojiCtl: AbstractControl;

  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  errorMessage: string;
  successMessage: string;
  mentorReportId: number;
  studentName: string;
  monthValidationMessage = '';
  emojiValidationMessage = '';
  narrativeValidationMessage = '';
  byProxy: string;
  returnTarget: string;
  readonly contactYears: SELECTITEM[] = constants.contactYears;
  readonly contactMonths: SELECTITEM[] = constants.months;
  private subscription: Subscription;

   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public location: Location,
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    public _fb: FormBuilder,
    private session: SessionService,
    public store: Store
  ) {
    console.log('Hi from MonthlyReportsAddComponent');

    this.myForm = _fb.group({
      lastContactYearSelector: { value: '' + constants.currentContactYear, disabled: true },
      lastContactMonthSelector: { value: '' + constants.currentContactMonth, disabled: true },
      // use bogus integer value so change detection works:
      inputEmoji: [666, { validators: [Validators.required, this.validateEmojis] }],
      narrative_English: ['', Validators.required],
      narrative_Spanish: [''],
      mentorReportId: [this.reportIdCtl]
    });

    this.lastYearCtl = this.myForm.controls.lastContactYearSelector;
    this.lastMonthCtl = this.myForm.controls.lastContactMonthSelector;
    this.emojiCtl = this.myForm.controls.inputEmoji;
    this.narrative_EnglishCtl = this.myForm.controls.narrative_English;
    this.narrative_SpanishCtl = this.myForm.controls.narrative_Spanish;
    this.reportIdCtl = this.myForm.controls.mentorReportId;
    this.mentorReport2.reviewedStatusId = 2087; // needs review

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitted = false;
    this.byProxy = this.currRoute.snapshot.params['byProxy'];
    if (this.byProxy === 'true') {
      this.returnTarget = '';
    }
  }

  ngOnInit() {
    console.log('monthlyReportsAdd ngOnInit');
    this.subscribeForStudentNames();
    this.mentorReport2.mentorGUId = this.currRoute.snapshot.params['mentorGUId'];
    this.mentorReport2.studentId = 0; // this.currRoute.snapshot.params['studentId'];
    this.mentorReport2.studentGUId = this.currRoute.snapshot.params['studentGUId'];
    // this.studentName = this.currRoute.snapshot.params['studentName'];
    console.log('mentorGUId ' + this.mentorReport2.mentorGUId);
    // console.log('studentId ' + this.mentorReport2.studentId);
    console.log('studentGUId ' + this.mentorReport2.studentGUId);

    if (this.mentorReport2.mentorGUId === 'undefined' || this.mentorReport2.mentorGUId === 'null') {
      // strange but needed since came from string parameter
      console.log('null or undefined value for mentorGUId');
      alert('Sorry, you must log out and log back in again before adding a new monthly report');
      this.onCancel();
    } else {
      // SQL Server will adjust the time to UTC by adding TimezoneOffset
      // we want to store local time so we adjust for that.
      const now = new Date();
      this.mentorReport2.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      console.log('reportDateTime = ' + this.mentorReport2.reportDateTime);
      // this.mentorReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
      this.mentorReport2.lastContactYear =  constants.currentContactYear;
      this.mentorReport2.lastContactMonth = 0;

      this.myForm.valueChanges.subscribe((value: any) => {
        console.log('valueChanges fired for form with values');
        console.log(JSON.stringify(value));
        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitted = false;
        // console.log('form change event');
        this.checkFormControlsAreValid(false);
      });
    }

  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: mrAdd new StudentName received' + this.studentName);
    });
  }

  checkFormControlsAreValid(bSubmitting: boolean): boolean {
    let allCorrect = true;
    this.errorMessage = '';
    this.monthValidationMessage = '';
    this.emojiValidationMessage = '';
    this.narrativeValidationMessage = '';
    if (this.lastMonthCtl.invalid && (this.lastMonthCtl.dirty || bSubmitting)) {
      this.monthValidationMessage = 'Please select the correct month. Por favor selecciona el mes corecto';
      allCorrect = false;
    }
    if (this.emojiCtl.invalid && (this.emojiCtl.dirty || bSubmitting)) {
      this.emojiValidationMessage = 'An emoji must be selected. Se debe seleccionar un Emoji';
      allCorrect = false;
    }
    if (this.narrative_EnglishCtl.invalid && (this.narrative_EnglishCtl.dirty || bSubmitting)) {
      this.narrativeValidationMessage = 'Description must be filled in. Descripcione debe rellenarse';
      allCorrect = false;
    }
    window.scrollTo(0, 0);
    return allCorrect;
  }

  onSubmit(): void {
    console.log('Hi from mentor Report2 Submit');
    if (this.isSubmitted) {
      return; // prevent dups
    }

    if (!this.checkFormControlsAreValid(true)) {
      return;
    }
    this.isSubmitted = true; // need to set guard immediately to prevent dups
    console.log('###before submitting update model with form control values');
    this.mentorReport2.lastContactYear = this.lastYearCtl.value;
    this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
    this.mentorReport2.emoji = this.emojiCtl.value;
    this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;
    this.mentorReportData.addMentorReport2(this.mentorReport2).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));
        // this.isSubmitted = true;
        this.isLoading = false;
        // don't need to provide params, StudentGuid service will do the job
        // const target = '/mentors';
        // console.log('after call to addMentorReport; navigating to ' + target);
        // this.router.navigateByUrl(target);
        this.location.back();
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    this.isSubmitted = true;
    return;
  }

  onCancel() {
    // don't need to provide params, StudentGuid service will do the job
    const target = '/mentors';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

  validateMonth(control: FormControl): IValidationType {
    // tslint:disable-next-line: triple-equals
    if ('' + control.value === '0') {
      // can be either string or number
      return { validateMonth: true };
    } else {
      return null;
    }
  }

  validateEmojis(control: FormControl): IValidationType {
    // console.log('emoji validator ' + control.value);
    if (control.value === 666) {
      return { validateEmojis: true };
    } else {
      return null;
    }
  }
  public hasChanges() {
    // if have changes then routing guard will ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.isSubmitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty && !this.isSubmitted;
  }
}
