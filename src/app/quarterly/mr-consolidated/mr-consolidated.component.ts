import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected-service';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { QuarterlyDataService } from '../quarterly-data.service';
import { QuarterlyReport } from '../quarterly-report';


@Component({
  selector: 'app-mr-consolidated',
  templateUrl: './mr-consolidated.component.html',
  styleUrls: ['./mr-consolidated.component.css']
})
export class MrConsolidatedComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;

  mentorReport: QuarterlyReport;
  mentorReportId: number;
  myForm: FormGroup;
  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  studentGUId: string;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService,
    private studentSelected: StudentSelectedService,
  ) {

    this.myForm = _fb.group({
      lastContactYearSelector: ['2019', Validators.required],
      narrative_English: ['', {}],
      narrative_Spanish: [''],
      mentorReportId: [this.reportIdCtl]
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['mentorReportId'];

  }

  ngOnInit() {
    // need for unsbuscribe!!!!!!!!!!!!!!!!!!!!
    // this.subscription =
    this.getCurrentStudentGUId();

  }


  ngOnDestroy() {

  }

  getCurrentStudentGUId() {
    console.log('MR set up studentGUId subscription');
    this.studentSelected.getStudentGUId()
      .subscribe(message => {
        this.studentGUId = message;
        console.log('MR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }
      });
  }

  fetchData() {

    console.log('MR fetchData');
    this.isLoading = true;
    this.quarterlyData.getPartialQuarterlyReportByPeriod('MR', this.studentGUId, '2019', '3', '0')
      .subscribe(
        data => { this.mentorReport = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          if (this.mentorReport) {
            console.log('### after retreiving, set form controls to retreived mentorReport');
            this.reportIdCtl.setValue(this.mentorReport.quarterlyReportId);
            this.narrative_EnglishCtl.setValue(this.mentorReport.mR_Narrative_English);
            this.narrative_SpanishCtl.setValue(this.mentorReport.mR_Narrative_Spanish);
          } else {
            console.log('no results returned');
            this.narrative_EnglishCtl.setValue('--No Report Found--');
            this.narrative_SpanishCtl.setValue('--No Report Found--');
          }

        });
  }

  onSubmit() {
    console.log('Hi from MentorReports Submit');
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

    this.mentorReport.mR_Narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport.mR_Narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.mentorReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.mentorReport, 'MR')
      .subscribe(
        (partial) => {
          console.log(this.successMessage = 'saved successfully/guardar con exito');
          this.isSubmitted = true;
          this.isLoading = false;
          const target = '/quarterly';
          console.log('after call to editMentorReport; navigating to ' + target);
          this.router.navigateByUrl(target);
        },
        (error) => {
          console.log(this.errorMessage = <any>error);
          this.isLoading = false;
        }
      );
    return false;
    return false;
  }

  onCancel() {
    const target = '/quarterly';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

}
