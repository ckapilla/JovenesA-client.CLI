import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from '../../app_shared/models/mentor-report2';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  templateUrl: '../monthly-reports2-add/monthly-reports2-add.component.html'
})

export class MonthlyReports2EditComponent
  implements OnInit {
  myForm: FormGroup;
  mentorReport2: MentorReport2RPT = new MentorReport2RPT();
  isLoading: boolean;
  submitted: boolean;

  lastYearCtl: AbstractControl;
  lastMonthCtl: AbstractControl;
  emojiCtl: AbstractControl;
  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;

  contactYears: SELECTITEM[];
  contactMonths: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  mentorReportId: number;
  studentName: string;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    private _fb: FormBuilder,
    private session: SessionService
  ) {

    console.log('Hi from MonthlyReports2AddComponent');
    this.contactYears = [
      // {value: '0', label: 'Select Year'},
      // {value: '2016', label: '2016'},
      // {value: '2017', label: '2017'},
      //   { value: '2018', label: '2018' },
      { value: '2019', label: '2019' },
      //    {value: '2020', label: '2020'}
    ];

    this.contactMonths = [
      { value: '0', label: 'Month/Mes' },
      { value: '1', label: 'Jan/Enero' },
      { value: '2', label: 'Feb/Feb' },
      { value: '3', label: 'Mar/Marzo' },
      { value: '4', label: 'Apr/Abr' },
      { value: '5', label: 'May/Mayo' },
      { value: '6', label: 'Jun/Jun' },
      { value: '7', label: 'Jul/Jul' },
      { value: '8', label: 'Aug/Agosto' },
      { value: '9', label: 'Sep/Sept' },
      { value: '10', label: 'Oct/Oct' },
      { value: '11', label: 'Nov/Nov' },
      { value: '12', label: 'Dec/Dic' }
    ];

    this.myForm = _fb.group({
      lastContactYearSelector: ['2018', Validators.required],
      // lastContactMonthSelector: ['', this.validateMonth],
      lastContactMonthSelector: [''],
      inputEmoji: [666, Validators.required], // use bogus integer value so change detection works
      inputNarrative_English: ['', Validators.required],
      inputNarrative_Spanish: [''],
      mentorReportId: [this.reportIdCtl]
    });

    this.lastYearCtl = this.myForm.controls['lastContactYearSelector'];
    this.lastMonthCtl = this.myForm.controls['lastContactMonthSelector'];
    this.emojiCtl = this.myForm.controls['inputEmoji'];
    this.narrative_EnglishCtl = this.myForm.controls['inputNarrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['inputNarrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['mentorReportId'];

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
    this.studentName = this.session.getStudentInContextName();
  }

  ngOnInit() {
    console.log('monthlyReportsEdit ngOnInit');

    // this.mentorReport.mentorId = this.currRoute.snapshot.params['mentorId'];
    // this.mentorReport.studentId = this.currRoute.snapshot.params['studentId'];
    // console.log('mentorId ' + this.mentorReport.mentorId);
    // console.log('studentId ' + this.mentorReport.studentId);

    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.mentorReport2.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.mentorReport2.reportDateTime);

    this.mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('calling sqlRenpsource with mentorReportId: ' + this.mentorReportId);
    this.isLoading = true;
    this.sqlResource.getMentorReport2(this.mentorReportId)
      .subscribe(
        data => { this.mentorReport2 = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          console.log('### after retreiving, set form controls to retreived mentorReport2-- reportId to ' + this.mentorReportId);
          // mentorId and studentId do not have corresponding controls
          this.reportIdCtl.setValue(this.mentorReportId);
          this.lastYearCtl.setValue(this.mentorReport2.lastContactYear);
          this.lastMonthCtl.setValue(this.mentorReport2.lastContactMonth);
          this.emojiCtl.setValue(this.mentorReport2.emoji);
          this.narrative_EnglishCtl.setValue(this.mentorReport2.narrative_English);
          this.narrative_SpanishCtl.setValue(this.mentorReport2.narrative_Spanish);
          this.studentName = this.session.getStudentInContextName();
        }
      );

    console.log('after init form values');
    this.myForm.valueChanges.subscribe(
      (form: any) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
        // console.log('form change event');
      }
    );
  }

  onSubmit() {
    console.log('Hi from mentor Report2 Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      let i = 0;
      this.errorMessage = '';

      if (!this.lastYearCtl.valid || !this.lastMonthCtl.valid) {
        this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs.<br /> Año y mes deben ser seleccionados de listas desplegables';
        ++i;
      }

      if (!this.emojiCtl.valid) {
        this.errorMessage = this.errorMessage + 'An emoji must be selected. Se debe seleccionar un Emoji';
        ++i;
      }

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
        ++i;
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls
    this.mentorReport2.lastContactYear = this.lastYearCtl.value;
    this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
    this.mentorReport2.emoji = this.emojiCtl.value;
    this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;


    this.sqlResource.updateMentorReport2(this.mentorReport2)
      .subscribe(
        (student) => {
          console.log(this.successMessage = <any>student);
          this.submitted = true;
          this.isLoading = false;
          const target = '/mentors/monthly-reports/' + this.mentorReport2.mentorId; // + '/' + this.mentorReport.studentId;
          console.log('after call to editMentorReport; navigating to ' + target);
          this.router.navigateByUrl(target);
        },
        (error) => {
          console.log(this.errorMessage = <any>error);
          this.isLoading = false;
        }
      );
    return false;
  }

  onCancel() {
    const target = '/mentors/monthly-reports/' + this.mentorReport2.mentorId; // + '/' + this.studentId;
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

  validateMonth(control: FormControl): { [error: string]: any } {
    console.log('month validator ' + control.value);
    const rtnVal: any = ('' + control.value === '0') ? { // can be either string or number
      validateMonth: {
        valid: false
      }
    } : null;
    console.log(rtnVal);
    return rtnVal;
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty && !this.submitted;
  }

}
