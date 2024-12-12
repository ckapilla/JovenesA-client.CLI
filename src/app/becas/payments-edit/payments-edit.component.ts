import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { BecaPayment } from 'src/app/_shared/models/beca-payment';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { StudentState } from 'src/app/_store/student/student.state';
import { BecaDataService } from '../../_shared/data/beca-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';

@Component({
  templateUrl: './payments-edit.component.html',
  styleUrls: ['./payments-edit.component.css']
})
export class PaymentsEditComponent implements OnInit {
  myForm: UntypedFormGroup;
  studentDTO: StudentDTO;
  becaPaymentsData: BecaPayment[];
  // entry: BecaPaymentDTO;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  months: SELECTITEM[];
  studentGUId: string;
  private subscription: Subscription;
  studentName: string;
  staticUrlPrefix: string;

  badgeColors = [
    'red',
    'green'
  ];

  admins$: Observable<SELECTITEM[]> = this.miscData.getAdmins$().pipe(
    catchError((err) => {
      this.errorMessage = err;
      console.log('CAUGHT ERROR IN Component ' + err);
      return EMPTY;
    })
  );

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);

  constructor(
    public becaData: BecaDataService,
    public router: Router,
    private miscData: MiscDataService,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private _fb: UntypedFormBuilder,
    public location: Location,
    public url: UrlService,
    private store: Store
  ) {
    console.log('Hi from paymentsEdit Ctrl controller function');

    this.staticUrlPrefix = url.getStaticFilePrefix();

    this.isLoading = false;

    this.myForm = this._fb.group({
      studentGUId: ['0000'],
      becaPaymentFormRows: this._fb.array([])
    });
  }

  becaPaymentFormRows(): UntypedFormArray {
    return <UntypedFormArray>this.myForm.get('becaPaymentFormRows');
  }

  createEmptyBecaPaymentDataFormRow(): UntypedFormGroup {
    console.log('CreateEmptyBecaPaymentDataFormRow create empty row to be populated');
    return this._fb.group({

  becaPaymentId: { value: '', disabled: true },
  pcsid: { value: '', disabled: true },
  pcsYear: { value: '', disabled: true },
  pcsMonthNum: { value: '', disabled: true },
  studentId: { value: '', disabled: false },
  studentGUId: { value: '', disabled: false },
  mentorReportStatusId: { value: '', disabled: false },
  studentReportStatusId: { value: '', disabled: false },
  inscriptionReportStatusId: { value: '', disabled: false },
  gradeReportStatusId: { value: '', disabled: false },
  paymentStatusId: { value: '', disabled: false },
  defaultBeca: { value: '', disabled: true },
  requestedBeca: { value: '', disabled: false },
  approvedBy: { value: '', disabled: false },
  approvedById: { value: '', disabled: false },
  approvedByDateTime: { value: '', disabled: false },
  comment: { value: '', disabled: false },
    });
  }

  updateBecaPaymentDataFormRow(becaPaymentFormRow: UntypedFormGroup, becaPaymentDataRow: BecaPayment): void {
    console.log('updateBecaPaymentDataRow update existing row with actual data');
    console.log(JSON.stringify(becaPaymentDataRow));
    becaPaymentFormRow.patchValue({

  becaPaymentId: 666,
  pcsid: 10666,
  pcsYear: 2025,
  pcsMonthNum: 1,
  studentId: 1234,
  studentGUId: '{ABCDEFG17890}',
  mentorReportStatusId: 0,
  studentReportStatusId: 0,
  inscriptionReportStatusId: 0,
  gradeReportStatusId: 0,
  paymentStatusId: 1,
  defaultBeca: 2500.00,
  requestedBeca: 2500.00,
  approvedBy: 'Sary',
  approvedById:2333,
  approvedByDateTime: new TruncateDatePipe().transform('' + '01/01/2001'),
  comment: 'this is a comment'
  });
    becaPaymentFormRow.markAsPristine();
  }

  addBecaPaymentDataRow(becaPaymentDataRow: BecaPayment) {
    const becaPaymentFormRow: UntypedFormGroup = this.createEmptyBecaPaymentDataFormRow();

    this.updateBecaPaymentDataFormRow(becaPaymentFormRow, becaPaymentDataRow);
    console.log('addBecaPaymentData: push new populated row intoFormArray');
    this.becaPaymentFormRows().push(becaPaymentFormRow);
  }

  ngOnInit() {
    console.log('paymentsEdit ngOnInit');
    this.subscribeForStudentGUIds2();
    // AABBCCEE
    this.subscribeForStudentNames();
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      this.studentName = message;
      console.log('************NGXS: payments edit new StudentName received' + this.studentName);
    });
  }

  subscribeForStudentGUIds2() {
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: payments edit new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.fetchFilteredData();
      }
    });
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.becaData.getBecaPaymentsForStudent(this.studentGUId).subscribe(
        (data) => {
          console.log('subscribe result in getBecaPaymentsForStudent');
          this.becaPaymentsData = data;
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          this.becaPaymentsData.forEach((becaPaymentDataRow) => {
            this.addBecaPaymentDataRow(becaPaymentDataRow);
          });

          console.log('data loaded now set timeout for scroll');
          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        }
      );
    }
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    // XXYYZZ this.session.setStudentInContextName(studentName);
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }
  isViewLinkHidden(imageSubmittedDate: any) {
    return (imageSubmittedDate === '1900-01-01T00:00:00');
  }
  saveAllChangedEntries() {
    console.log('becaPaymentsData length is ' + this.becaPaymentsData.length);
    for (let i = 0; i < this.becaPaymentsData.length; ++i) {
      console.log('saveEntry ' + i);
      this.saveEntry(i);
    }
    this.myForm.markAsPristine();
  }

  resetAllChangedEntries() {
    console.log('becaPaymentsData length is ' + this.becaPaymentsData.length);
    for (let i = 0; i < this.becaPaymentsData.length; ++i) {
      console.log('saveEntry ' + i);
      this.resetEntry(i);
    }
    this.myForm.markAsPristine();
  }

  retrieveFormValuesForRow(i: number): void {
    console.log('retrieveFormValues for row' + JSON.stringify(this.becaPaymentFormRows().value[i]));
    this.becaPaymentsData[i] = { ...this.becaPaymentsData[i], ...this.becaPaymentFormRows().value[i] };
  }

  isRowDirty(i: number): boolean {
    // console.log('checking dirty state of i ' + i + ' -- ' + this.becaPaymentFormRows().controls[i].dirty);
    return this.becaPaymentFormRows().controls[i].dirty;
  }

  saveEntry(i: number): boolean {
    console.log('saveEntry for ' + i);
    this.isLoading = true;
    this.errorMessage = '';
    console.log('row dirty value is ' + this.becaPaymentFormRows().controls[i].dirty);
    if (this.becaPaymentFormRows().controls[i].dirty) {
      this.becaPaymentFormRows().controls[i].get('confirmedDate').enable();
      this.retrieveFormValuesForRow(i);
      this.becaData.updateBecaPayments(this.becaPaymentsData[i]).subscribe(
        (gradeRowData) => {
          console.log('subscribe result in updateBecaPaymentData');
          console.log(JSON.stringify(gradeRowData));
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          const currRowFormGroup = this.becaPaymentFormRows().controls[i] as UntypedFormGroup;
          // this fails for some reason, and isn't needed because the update won't change any of these values
          // this.updateBecaPaymentDataRow(currRowFormGroup, gradeRowData);
          currRowFormGroup.markAsPristine();
          this.becaPaymentFormRows().controls[i].get('confirmedDate').disable();
          // this.successMessage = 'Changes were saved successfully.';
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {
            // console.log('clearing success message');
            this.successMessage = '';
          }, 3000);
        },
        () => {
          this.errorMessage = 'Confirmed By must be selected. Also Turned-in Date be filled in';
          this.isLoading = false;
        }
      );
    }
    // prevent default action of reload
    return false;
  }

  resetEntry(i: number): boolean {
    console.log('resetEntry for ' + i);

    if (this.becaPaymentFormRows().controls[i].dirty) {
      this.retrieveFormValuesForRow(i);
      this.becaPaymentFormRows().controls[i].reset();
      this.becaPaymentFormRows().controls[i].markAsPristine();
    }
    // prevent default action of reload
    return false;
  }

  setReceivedDate(i: number, currDateValue: string): void {
    console.log('setReceivedDate with curr = ' + currDateValue);
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    let d: Date;
    // if empty set it to two days ago; if currently has a value, increment by one day
    if (currDateValue > '') {
      d = new Date(currDateValue + ' 00:00:01');
      d.setDate(d.getDate() - 1);
    } else {
      d = new Date();
    }
    const strDate = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');

    const gradeEntryRow: UntypedFormGroup = this.becaPaymentFormRows().controls[i] as UntypedFormGroup;
    gradeEntryRow.patchValue({
      gradesTurnedInDate: strDate
    });
    gradeEntryRow.markAsDirty();
  }

  setApprovedBy(i: number, adminId?: any): void {
    console.log('setApprovedBy with adminId = ' + adminId);
    const gradeEntryRow: UntypedFormGroup = this.becaPaymentFormRows().controls[i] as UntypedFormGroup;
    if (adminId === null || adminId === 'null') {

      gradeEntryRow.patchValue({
        confirmedById: null,
        confirmedDate: null
      });
    } else {
      const d = new Date();
      const strDate = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');
      console.log(strDate);
      gradeEntryRow.patchValue({
        confirmedById: adminId,
        confirmedDate: strDate
      });

    }


    gradeEntryRow.markAsDirty();
  }

  imageLoaded(dateLoaded: any){
    console.log('dateLoaded [' + dateLoaded + ']');
    return dateLoaded !== 'null';
  }


  toFixedValue(num: number | null) {
    if (num === null || num === undefined) {
      return '';
    } else {
      return num.toFixed(1);
    }
  }

  public hasChanges() {
    // if have changes then routing guard will ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty;
  }
}
