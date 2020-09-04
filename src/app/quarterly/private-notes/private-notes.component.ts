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
  selector: 'app-private-notes',
  templateUrl: './private-notes.component.html'
})
export class PrivateNotesComponent implements OnInit, OnChanges {
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
  @Input() selectedYear: string;
  @Input() selectedPeriod: string;
  private subscription: Subscription;

  @Select(StudentState.getSelectedStudentGUId)  currentGUId$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public miscData: MiscDataService,
    private _fb: FormBuilder,
    public session: SessionService,
    public quarterlyData: QuarterlyDataService,
    // delete me private selectedStudent: SelectedStudent
  ) {
    this.myForm = _fb.group({
      // lastContactYearSelector: ['', Validators.required],
      narrative: [ '' ],
      quarterlyReportId: [ this.reportIdCtl ]
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
    this.subscribeForStudentGUIds2();
  }

  // ngOnDestroy() {
  //   // console.log('{{{{{{{{{{{{{PN ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
  //   this.subscription.unsubscribe();
  // }

  // subscribeForStudentGUIds() {
  //   // console.log('PN set up studentGUId subscription');
  //   this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
  //     this.studentGUId = message;
  //     console.log('PN new StudentGUId received' + this.studentGUId);
  //     if (this.studentGUId && this.studentGUId !== '0000') {
  //       this.fetchFilteredData();
  //     }
  //   });
  // }

  subscribeForStudentGUIds2() {
    // console.log('header set up studentGUId subscription');
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
        .getPartialQuarterlyReportByPeriod('PN', this.studentGUId, this.selectedYear, this.selectedPeriod, '0')
        .subscribe(
          (data) => {
            this.privateNotes = data;
          },
          (err) => console.error('Subscribe error: ' + err),
          () => {
            this.isLoading = false;
            if (
              this.privateNotes &&
                            this.privateNotes.pN_Narrative &&
                            this.privateNotes.pN_Narrative.length > 0
            ) {
              console.log('### after retreiving, set form controls to retreived selfReport');
              this.narrativeCtl.setValue(this.privateNotes.pN_Narrative);
            } else {
              console.log('no results returned');
              this.narrativeCtl.setValue('');
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

      if (!this.narrativeCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls

    this.privateNotes.pN_Narrative = this.narrativeCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.quarterlyData.updatePartialQuarterlyReport(this.privateNotes, 'PN').subscribe(
      () => {
        this.successMessage = 'Saved successfully / Guardar con exito';
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 5000);
        this.isSubmitted = true;
        this.isLoading = false;
        const target = '/quarterly';
        console.log('after call to edit PN; navigating to ' + target);
        // this.router.navigateByUrl(target);
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

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedYear || changes.selectedPeriod) {
      console.log(changes);
      this.fetchFilteredData();
    }
  }
}
