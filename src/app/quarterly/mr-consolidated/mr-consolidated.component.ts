import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { QuarterlyReport } from '../../_shared/models/quarterly-report';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  selector: 'app-mr-consolidated',
  templateUrl: './mr-consolidated.component.html',
  styleUrls: [ './mr-consolidated.component.css' ]
})
export class MrConsolidatedComponent implements OnInit, OnChanges {
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
  @Input() bEditable: boolean;
  @Input() selectedYear: string;
  @Input() selectedPeriod: string;
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public miscData: MiscDataService,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService
  ) {
    this.myForm = _fb.group({
      // lastContactYearSelector: ['', Validators.required],
      narrative_English: [ '', {} ],
      narrative_Spanish: [ '' ],
      mentorReportId: [ this.reportIdCtl ]
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['mentorReportId'];
  }

  ngOnInit() {
    if (this.bEditable) {
      this.myForm.enable();
    } else {
      this.myForm.disable();
    }
    console.log('(((((((((((((((((MR ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: mr new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      console.log('MR fetchData');
      this.isLoading = true;
      this.quarterlyData
        .getPartialQuarterlyReportByPeriod('MR', this.studentGUId, this.selectedYear, this.selectedPeriod, '0')
        .subscribe(
          (data) => {
            this.mentorReport = data;
          },
          (err) => console.error('Subscribe error: ' + err),
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
          }
        );
    }
  }

  onSubmit() {
    console.log('Hi from MentorReports Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls

    this.mentorReport.mR_Narrative_English = this.narrative_EnglishCtl.value;
    this.mentorReport.mR_Narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.mentorReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.mentorReport, 'MR').subscribe(
      () => {
        this.successMessage = 'Saved successfully / Guardar con exito';
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 1000);
        this.isSubmitted = true;
        this.isLoading = false;
        const target = '/quarterly';
        console.log('after call to editMentorReport; navigating to ' + target);
        // this.router.navigateByUrl(target);
      },
      (error) => {
        this.errorMessage = error;
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

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedYear || changes.selectedPeriod) {
      console.log(changes);
      this.fetchFilteredData();
    }
  }
}
