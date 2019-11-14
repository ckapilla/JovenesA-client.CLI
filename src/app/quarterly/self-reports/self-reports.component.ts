import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MiscDataService } from 'src/app/app_shared/services/misc-data.service';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected-service';
import { SessionService } from '../../app_shared/services/session.service';
import { QuarterlyDataService } from '../quarterly-data.service';
import { QuarterlyReport } from '../quarterly-report';

@Component({
  selector: 'app-self-reports',
  templateUrl: './self-reports.component.html',
  styleUrls: ['./self-reports.component.css', '../../../assets/css/forms.css'],
})

export class SelfReportsComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;

  studentSelfReport: QuarterlyReport;
  quarterlyReportId: number;
  myForm: FormGroup;
  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  studentGUId: string;
  @Input() bEditable: boolean;
  private subscription: Subscription;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public miscData: MiscDataService,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService,
    private studentSelected: StudentSelectedService
  ) {

    this.myForm = _fb.group({
      lastContactYearSelector: ['2019', Validators.required],
      narrative_English: ['', {}],
      narrative_Spanish: [''],
      quarterlyReportId: [this.reportIdCtl]
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['quarterlyReportId'];

  }
  ngOnInit() {
    if (this.bEditable) {
      this.myForm.enable();
    } else {
      this.myForm.disable();
    }

    // console.log('(((((((((((((((((SR ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds();
    // console.log('after subscribe' + this.studentSelected.getInternalSubject().observers.length);

  }

  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{SR ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    // this.studentSelected.unsubscribe();
    this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    console.log('SR set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('SR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  fetchData() {

    console.log('ssr fetchData');
    this.isLoading = true;
    this.quarterlyData.getPartialQuarterlyReportByPeriod('SR', this.studentGUId, '2019', '3', '0')
      .subscribe(
        data => { this.studentSelfReport = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          if (this.studentSelfReport) {
            console.log('### after retreiving, set form controls to retreived selfReport');
            this.reportIdCtl.setValue(this.studentSelfReport.quarterlyReportId);
            this.narrative_EnglishCtl.setValue(this.studentSelfReport.sR_Narrative_English);
            this.narrative_SpanishCtl.setValue(this.studentSelfReport.sR_Narrative_Spanish);
          } else {
            console.log('no results returned');
            this.narrative_EnglishCtl.setValue('--No Report Found--');
            this.narrative_SpanishCtl.setValue('--No Report Found--');
          }

        });
  }

  onSubmit() {
    console.log('Hi from Self Reports Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      let i = 0;
      this.errorMessage = '';

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
        ++i;
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls

    this.studentSelfReport.sR_Narrative_English = this.narrative_EnglishCtl.value;
    this.studentSelfReport.sR_Narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.studentSelfReport, 'SR')
      .subscribe(
        (partial) => {
          this.successMessage = 'Saved successfully / Guardar con exito';
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 5000);
          this.isSubmitted = true;
          this.isLoading = false;
          const target = '/quarterly';
          console.log('after call to edit SSR; navigating to ' + target);
          // this.router.navigateByUrl(target);
        },
        (error) => {
          this.errorMessage = <any>error.message;
          this.isLoading = false;
        }
      );
    return false;
  }

  onCancel() {
    const target = '/quarterly';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

}
