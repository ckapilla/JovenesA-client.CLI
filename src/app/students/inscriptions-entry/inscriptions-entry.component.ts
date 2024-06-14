import { Location, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { InscriptionDataService } from 'src/app/_shared/data/inscription-data.service';

import { Inscription } from 'src/app/_shared/models/inscription';
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
  inscription: Inscription[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  years: SELECTITEM[];
  months: SELECTITEM[];
  studentGUId: string;
  private subscription: Subscription;
  studentName: string;
  confirmedDateB: boolean;
  inGradesProcessingPeriod: boolean;

   currentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);
   currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
  errorAlert: boolean;
  successAlert: boolean;

  constructor(
    public inscriptionData: InscriptionDataService,
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
      gradeEntryFormRows: this._fb.array([])
    });
  }

  gradeEntryFormRows(): UntypedFormArray {
    return <UntypedFormArray>this.myForm.get('gradeEntryFormRows');
  }

  createEmptyGradeEntryFormRow(): UntypedFormGroup {
    console.log('CreateEmptyGradeEntry create empty row to be populated');
    return this._fb.group({
      gradesProcessingPeriodId: { value: '', disabled: true },
      initialGradesEntryDate: { value: '', disabled: true },
      gradesDueDate: { value: '', disabled: true },
      gradesTurnedInDate: [
        { value: '' }, // must use readonly in html instead of disabled here so value will get sent to server
        Validators.compose([Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10)])
      ],
      gradePointAvg: [{ value: '' }, Validators.pattern(/^\d{1,2}\.\d{1,1}$/)],
      confirmedDate: { value: '', disabled: true }
    });
  }

  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    console.log('gradeEntry ngOnInit, studentGUID = ' + this.studentGUId);
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.inscriptionData.getInscription(this.studentGUId).subscribe(
        (dataArray) => {
          // if want to have all empty ones, not just latest:
          // this.studentGradesData = dataArray.filter(this.filter_dates);
          // get latest one
          this.inscription = dataArray.slice(0, 1);
        },
        (err) => {
          console.log('XXE1');
          this.errorMessage = err;
        },
        // () => {
        //   this.inscription.forEach((gradeEntryDataRow) => {
        //     this.addGradeEntryRow(gradeEntryDataRow);
        //   });
        //   this.isLoading = false;
        // }
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
    const gradeEntryFormRow: UntypedFormGroup = this.gradeEntryFormRows().controls[i] as UntypedFormGroup;

    gradeEntryFormRow.patchValue({
      gradesTurnedInDate: strDate
    });
    gradeEntryFormRow.markAsDirty();
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
