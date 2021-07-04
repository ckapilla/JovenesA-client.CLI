import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
import { QuarterlyDataService } from '../../_shared/data/quarterly-data.service';
import { QuarterlyReport } from '../../_shared/models/quarterly-report';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  selector: 'app-self-reports',
  templateUrl: './self-reports.component.html',
  styleUrls: ['./self-reports.component.css', '../../../assets/css/forms.css']
})
export class SelfReportsComponent implements OnInit {
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
  qrComponentsEditable: boolean;
  selectedQRPeriod = '';
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;
  @Select(UIState.getselectedQRPeriod) selectedQRPeriod$: Observable<string>;
  @Select(UIState.getQRComponentsEditable) qrComponentsEditable$: Observable<boolean>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public miscData: MiscDataService,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService
  ) {
    this.myForm = _fb.group({
      narrative_English: ['', {}],
      narrative_Spanish: [''],
      quarterlyReportId: [this.reportIdCtl]
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['quarterlyReportId'];
  }
  ngOnInit() {
    this.qrComponentsEditable$.subscribe((flag) => {
      this.qrComponentsEditable = flag;

      if (this.qrComponentsEditable) {
        this.myForm.enable();
      } else {
        this.myForm.disable();
      }
    });

    // console.log('(((((((((((((((((SelfReports ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds2();
    this.subscribeForselectedQRPeriod();
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: SR new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SR new selectedQRPeriod received' + this.selectedQRPeriod);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    if (
      this.studentGUId &&
      this.studentGUId !== undefined &&
      this.studentGUId !== '0000' &&
      this.selectedQRPeriod !== ''
    ) {
      this.isLoading = true;
      this.quarterlyData
        .getPartialQuarterlyReportByPeriod('SR', this.studentGUId, this.selectedQRPeriod, '0')
        .subscribe(
          (data) => {
            this.studentSelfReport = data;
          },
          (err) => console.error('Subscribe error: ' + err),
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
          }
        );
    }
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');

    this.studentSelfReport.sR_Narrative_English = this.narrative_EnglishCtl.value;
    this.studentSelfReport.sR_Narrative_Spanish = this.narrative_SpanishCtl.value;

    this.quarterlyData.updatePartialQuarterlyReport(this.studentSelfReport, 'SR').subscribe(
      () => {
        this.successMessage = 'Saved successfully / Guardar con exito';
        window.setTimeout(() => {
          this.successMessage = '';
        }, 5000);
        this.isSubmitted = true;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error.message;
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
