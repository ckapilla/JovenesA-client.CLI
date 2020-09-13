import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

interface IValidationType {
  [error: string]: boolean | null;
}

@Component({
  templateUrl: '../monthly-reports2-edit/monthly-reports2-edit.component.html'
})
export class MonthlyReports2EditComponent implements OnInit {
  myForm: FormGroup;
  mentorReport2: MentorReport2RPT = new MentorReport2RPT();
  isLoading: boolean;
  isSubmitted: boolean;

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
  readonly contactYears: SELECTITEM[] = constants.years;
  readonly contactMonths: SELECTITEM[] = constants.months;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public mentorReportData: MentorReport2DataService,
    private _fb: FormBuilder,
    private session: SessionService
  ) {
    console.log('Hi from MonthlyReports2EditComponent');

    this.myForm = _fb.group({
      lastContactYearSelector: ['2020'], // Validators.required],
      lastContactMonthSelector: ['0', { validators: [this.validateMonth] }],
      // use bogus integer value so change detection works:
      inputEmoji: [666, { validators: [Validators.required, this.validateEmojis] }],
      narrative_English: ['', Validators.required],
      narrative_Spanish: [''],
      mentorReportId: [this.reportIdCtl]
    });

    // this.myForm.setValidators(this.validateNarrativeFields());

    this.lastYearCtl = this.myForm.controls['lastContactYearSelector'];
    this.lastMonthCtl = this.myForm.controls['lastContactMonthSelector'];
    this.emojiCtl = this.myForm.controls['inputEmoji'];
    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['mentorReportId'];
    this.mentorReport2.reviewedStatusId = 2087; // needs review

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitted = false;
    this.studentName = this.session.getStudentInContextName();
  }

  ngOnInit() {
    console.log('monthlyReportsEdit ngOnInit');

    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.mentorReport2.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.mentorReport2.reportDateTime);

    this.mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('calling sqlRenpsource with mentorReportId: ' + this.mentorReportId);
    this.isLoading = true;
    this.mentorReportData.getMentorReport2(this.mentorReportId).subscribe(
      (data) => {
        this.mentorReport2 = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.isLoading = false;
        console.log(
          '### after retreiving, set form controls to retreived mentorReport2-- reportId to ' + this.mentorReportId
        );
        this.reportIdCtl.setValue(this.mentorReportId);
        this.lastYearCtl.setValue(this.mentorReport2.lastContactYear);
        this.lastMonthCtl.setValue(this.mentorReport2.lastContactMonth);
        this.emojiCtl.setValue(this.mentorReport2.emoji);
        this.emojiCtl.setValue(0);
        this.narrative_EnglishCtl.setValue(this.mentorReport2.narrative_English);
        this.narrative_SpanishCtl.setValue(this.mentorReport2.narrative_Spanish);
        this.studentName = this.session.getStudentInContextName();
      }
    );

    console.log('after init form values');
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

  checkFormControlsAreValid(bSubmitting: boolean): boolean {
    console.log('checking for valid form controls');
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
  onSubmit() {
    console.log('Hi from mentor Report2 Submit');

    if (!this.checkFormControlsAreValid(true)) {
      return;
    }

    console.log('###before submitting update model with form control values');
    this.mentorReport2.lastContactYear = this.lastYearCtl.value;
    this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
    this.mentorReport2.emoji = this.emojiCtl.value;
    this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.mentorReport2.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.mentorReportData.updateMentorReport2(this.mentorReport2).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));

        this.isLoading = false;
        // don't need to provide params, StudentGuid service will do the job
        const target = '/mentors';
        console.log('after call to editMentorReport; navigating to ' + target);
        this.router.navigateByUrl(target);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    this.isSubmitted = true;
    return false;
  }

  onCancel() {
    // don't need to provide params, StudentGuid service will do the job
    const target = '/mentors';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

  validateMonth(control: FormControl): IValidationType {
    console.log('validateMonth has input ' + control.value);
    // tslint:disable-next-line: triple-equals
    if ('' + control.value === '0') {
      // can be either string or number
      console.log('validateMonth failed');
      return { validateMonth: true };
    } else {
      return null;
    }
  }

  validateEmojis(control: FormControl): IValidationType {
    // console.log('emoji validator ' + control.value);
    if (control.value === 666) {
      console.log('validate emoji failed');
      return { validateEmojis: true };
    } else {
      return null;
    }
  }

  // validateNarrativeFields(): ValidatorFn {
  //   return (group: FormGroup): ValidationErrors => {
  //     //   if (this.narrative_EnglishCtl.value.length || this.narrative_SpanishCtl.value.length) {
  //     //     this.narrative_EnglishCtl.setErrors(null);
  //     //     this.narrative_SpanishCtl.setErrors(null);
  //     //     // console.log('OK: at least one narrative not empty');
  //     //   } else {
  //     //     this.narrative_EnglishCtl.setErrors({ bothEmpty: true });
  //     //     this.narrative_SpanishCtl.setErrors({ bothEmpty: true });
  //     //     // console.log('ERROR: both narratives empty');
  //     //   }

  //     return;
  //   };
  // }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been isSubmitted
    console.log('hasChanges has submitted ' + this.isSubmitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty && !this.isSubmitted;
  }
}
