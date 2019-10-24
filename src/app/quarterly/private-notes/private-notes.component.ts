
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentSelectedService } from 'src/app/app_shared/services/student-selected-service';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { QuarterlyDataService } from '../quarterly-data.service';
import { QuarterlyReport } from '../quarterly-report';


@Component({
  selector: 'app-private-notes',
  templateUrl: './private-notes.component.html'
})
export class PrivateNotesComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;
  privateNotes: QuarterlyReport;
  quarterlyReportId: number;
  myForm: FormGroup;
  narrativeCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  studentGUId: string;
  @Input() bEditable: boolean;
  private subscription: Subscription;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService,
    private studentSelected: StudentSelectedService
  ) {

    this.myForm = _fb.group({
      lastContactYearSelector: ['2019', Validators.required],
      narrative: [''],
      quarterlyReportId: [this.reportIdCtl]
    });

    this.narrativeCtl = this.myForm.controls['narrative'];
    this.reportIdCtl = this.myForm.controls['quarterlyReportId'];


  }
  ngOnInit() {
    if (this.bEditable) {
      this.myForm.enable();
    } else {
      this.myForm.disable();
    }

    // console.log('(((((((((((((((((PN ngOnInit)))))))))))))');
    this.subscribeForStudentGUIds();
    // console.log('after subscribe' + this.studentSelected.getInternalSubject().observers.length);

  }

  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{PN ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    // this.studentSelected.unsubscribe();
    this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    console.log('PN set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('PN new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchData();
        }

        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  fetchData() {

    console.log('ssr fetchData');
    this.isLoading = true;
    this.quarterlyData.getPartialQuarterlyReportByPeriod('PN', this.studentGUId, '2019', '3', '0')
      .subscribe(
        data => { this.privateNotes = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          if (this.privateNotes && this.privateNotes.pN_Narrative && this.privateNotes.pN_Narrative.length > 0) {
            console.log('### after retreiving, set form controls to retreived selfReport');
            this.narrativeCtl.setValue(this.privateNotes.pN_Narrative);
          } else {
            console.log('no results returned');
            this.narrativeCtl.setValue('');
          }
        });
  }

  onSubmit() {
    console.log('Hi from Self Reports Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      let i = 0;
      this.errorMessage = '';

      if (!this.narrativeCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
        ++i;
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls

    this.privateNotes.pN_Narrative = this.narrativeCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.privateNotes, 'PN')
      .subscribe(
        (partial) => {
          this.successMessage = 'Saved successfully / Guardar con exito';
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 5000);
          this.isSubmitted = true;
          this.isLoading = false;
          const target = '/quarterly';
          console.log('after call to edit PN; navigating to ' + target);
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