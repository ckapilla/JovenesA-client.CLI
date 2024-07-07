import { Location, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { InscriptionDataService } from 'src/app/_shared/data/inscription-data.service';
import { Inscription } from 'src/app/_shared/models/inscription';
import { TruncateDatePipe } from "src/app/_shared/pipes/truncate-date-pipe";
import { StudentState } from 'src/app/_store/student/student.state';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
// import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import localePy from '@angular/common/locales/es-PY';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
registerLocaleData(localePy, 'es');
@Component({
  templateUrl: './inscriptions-entry.component.html',
  styleUrls: ['./inscriptions-entry.component.css', '../students.component.css']
})
export class InscriptionsEntryComponent implements OnInit {
  myForm: UntypedFormGroup;
  studentDTO: StudentDTO;
  inscriptionsData: Inscription[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  months: SELECTITEM[];
  studentGUId: string;
  private subscription: Subscription;
  studentName: string;
  confirmedDate: boolean;
  inGradesProcessingPeriod: boolean;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
  errorAlert: boolean;
  successAlert: boolean;

  constructor(
    public inscriptionDataSvc: InscriptionDataService,
    public router: Router,
    // private route: ActivatedRoute,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private _fb: UntypedFormBuilder,
    public location: Location,
    private store: Store
  ) {
    this.isLoading = false;
    this.inGradesProcessingPeriod = true;
    this.myForm = this._fb.group({
      studentGUId: ['0000'],
      inscriptionEntryFormRows: this._fb.array([])
    });
  }

  inscriptionEntryFormRows(): UntypedFormArray {
    return <UntypedFormArray>this.myForm.get('inscriptionEntryFormRows');
  }

  createEmptyInscriptionEntryFormRow(): UntypedFormGroup {
    console.log('CreateEmptyInscriptionEntry create empty row to be populated');
    return this._fb.group({
      gradesProcessingPeriodId: { value: '', disabled: true },
      initialGradesEntryDate: { value: '', disabled: true },
      XXinscriptionsDueDate: { value: '', disabled: true },
      registrationFormSubmittedDate: { value: '' }, // must use readonly in html instead of disabled here so value will get sent to server
      paymentReceiptSubmittedDate: { value: '' }, // must use readonly in html instead of disabled here so value will get sent to server
      confirmedDate: { value: '', disabled: true }
    });
  }

  updateInscriptionEntryFormRow(
    inscriptionEntryFormRow: UntypedFormGroup,
    inscriptionEntryDataRow: Inscription
  ): void {
    console.log(
      "updateInscriptionEntryFormRow update existing form row with retrieved data"
    );
    console.log(JSON.stringify(inscriptionEntryDataRow));
    inscriptionEntryFormRow.patchValue({
      gradesProcessingPeriodId: inscriptionEntryDataRow.gradesProcessingPeriodId,
      initialGradesEntryDate: new TruncateDatePipe().transform(
        "" + inscriptionEntryDataRow.initialInscriptionsEntryDate
      ),
      inscriptionsDueDate: new TruncateDatePipe().transform(
        "" + inscriptionEntryDataRow.inscriptionsDueDate
      ),
      // inscriptionsTurnedInDate: new Date().toISOString().slice(0, 10),
      // confirmedDate: new TruncateDatePipe().transform(
      //   "" + inscriptionEntryDataRow.confirmedDate
      // ),
    });

    inscriptionEntryFormRow.markAsPristine();
  }

  addInscriptionEntryRow(inscriptionEntryDataRow: Inscription) {
    const inscriptionEntryFormRow: UntypedFormGroup = this.createEmptyInscriptionEntryFormRow();

    this.updateInscriptionEntryFormRow(inscriptionEntryFormRow, inscriptionEntryDataRow);
    console.log("addInscriptionEntry: push new populated row intoFormArray");
    this.inscriptionEntryFormRows().push(inscriptionEntryFormRow);
  }
  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    console.log('inscriptionEntry ngOnInit, studentGUID = ' + this.studentGUId);
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.inscriptionDataSvc.getInscriptionsForStudent(this.studentGUId).subscribe(
        (dataArray) => {
          // if want to have all empty ones, not just latest:
          // this.inscriptions = dataArray.filter(this.filter_dates);
          // get latest one
          this.inscriptionsData = dataArray.slice(0, 1);
          console.log('XXE0');
          console.log(JSON.stringify(this.inscriptionsData));

        },
        (err) => {
          console.log('XXE1');
          this.errorMessage = err;
        },
        () => {
          console.log('XXE2');
          this.inscriptionsData.forEach((inscriptionEntryDataRow) => {
            this.addInscriptionEntryRow(inscriptionEntryDataRow);
          });
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

  setReceivedDate(i: number, currDateValue: string): void {
    console.log('setReceivedDate with curr = ' + currDateValue);
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    let d: Date;
    // if empty set it to two days ago; if currently has a value, increment by one day
    if (currDateValue > '') {
      d = new Date(currDateValue + ' 00:00:01');
      //d.setDate(d.getDate() - 1);
    } else {
      d = new Date();
    }
    const strDate = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');
    const inscriptionEntryFormRow: UntypedFormGroup = this.inscriptionEntryFormRows().controls[i] as UntypedFormGroup;

    inscriptionEntryFormRow.patchValue({
      inscriptionsTurnedInDate: strDate
    });
    inscriptionEntryFormRow.markAsDirty();
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
  closeAlert(value: boolean){
    this.errorAlert = value;
    this.successAlert = value;
  }
}
