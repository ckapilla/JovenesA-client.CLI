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
  selector: 'app-ja-comments',
  templateUrl: './ja-comments.component.html',
  styleUrls: [ './ja-comments.component.css' ]
})
export class JaCommentsComponent implements OnInit, OnChanges {
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;
  jaComment: QuarterlyReport;
  quarterlyReportId: number;
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
      quarterlyReportId: [ this.reportIdCtl ]
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

    // console.log('(((((((((((((((((JA ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds2();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.quarterlyData
        .getPartialQuarterlyReportByPeriod('JA', this.studentGUId, this.selectedYear, this.selectedPeriod, '0')
        .subscribe(
          (data) => {
            this.jaComment = data;
          },
          (err) => console.error('Subscribe error: ' + err),
          () => {
            this.isLoading = false;
            if (this.jaComment) {
              console.log('### after retreiving, set form controls to retreived selfReport');
              this.narrative_SpanishCtl.setValue(this.jaComment.jA_Narrative_Spanish);
              if (!this.bEditable) {
                if (this.jaComment.jA_Narrative_English.length === 0) {
                  this.jaComment.jA_Narrative_English = '-- No additional comments this quarter --';
                }
                if (this.jaComment.jA_Narrative_Spanish.length === 0) {
                  this.jaComment.jA_Narrative_Spanish = '-- No hay comentarios adicionales este trimestre --';
                }
              }
              this.narrative_EnglishCtl.setValue(this.jaComment.jA_Narrative_English);
              this.narrative_SpanishCtl.setValue(this.jaComment.jA_Narrative_Spanish);
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
    console.log('Hi from Self Reports Submit');
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

    this.jaComment.jA_Narrative_English = this.narrative_EnglishCtl.value;
    this.jaComment.jA_Narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.jaComment, 'JA').subscribe(
      () => {
        this.successMessage = 'Saved successfully / Guardar con exito';
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 5000);
        this.isSubmitted = true;
        this.isLoading = false;
        const target = '/quarterly';
        console.log('after call to edit JA; navigating to ' + target);
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
  // tslint:disable-next-line: no-trailing-whitespace

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedYear || changes.selectedPeriod) {
      console.log(changes);
      this.fetchFilteredData();
    }
  }
}
