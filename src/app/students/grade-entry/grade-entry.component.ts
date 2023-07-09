import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BecaDataService } from 'src/app/_shared/data/beca-data.service';
import { GradesGivenEntryDTO } from 'src/app/_shared/models/grades-given-entryDTO';
import { StudentGrades } from 'src/app/_shared/models/student-grades';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { StudentState } from 'src/app/_store/student/student.state';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
// import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './grade-entry.component.html',
  styleUrls: ['./grade-entry.component.css']
})
export class GradeEntryComponent implements OnInit {
  myForm: UntypedFormGroup;
  studentDTO: StudentDTO;
  studentGradesData: StudentGrades[];
  entry: GradesGivenEntryDTO;
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

  constructor(
    public becaData: BecaDataService,
    public router: Router,
    // private route: ActivatedRoute,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private _fb: UntypedFormBuilder,
    public location: Location,
    private store: Store
  ) {
    this.isLoading = false;
    this.inGradesProcessingPeriod = false;
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

  updateGradeEntryFormRow(gradeEntryFormRow: UntypedFormGroup, gradeEntryDataRow: StudentGrades): void {
    console.log('updateGradeEntryFormRow update existing form row with retrieved data');
    console.log(JSON.stringify(gradeEntryDataRow));
    gradeEntryFormRow.patchValue({
      gradesProcessingPeriodId: gradeEntryDataRow.gradesProcessingPeriodId,
      initialGradesEntryDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.initialGradesEntryDate),
      gradesDueDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.gradesDueDate),
      gradesTurnedInDate: new Date().toISOString().slice(0, 10),
      gradePointAvg: this.toFixedValue(gradeEntryDataRow.gradePointAvg),
      confirmedDate: new TruncateDatePipe().transform('' + gradeEntryDataRow.confirmedDate)
    });
    if (gradeEntryFormRow.get('confirmedDate').value > '') {
      gradeEntryFormRow.get('gradePointAvg').disable();
      this.confirmedDateB=true;
    }

    gradeEntryFormRow.markAsPristine();

  }

  addGradeEntryRow(gradeEntryDataRow: StudentGrades) {
    const gradeEntryFormRow: UntypedFormGroup = this.createEmptyGradeEntryFormRow();

    this.updateGradeEntryFormRow(gradeEntryFormRow, gradeEntryDataRow);
    console.log('addGradeEntry: push new populated row intoFormArray');
    this.gradeEntryFormRows().push(gradeEntryFormRow);
  }

  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    console.log('gradeEntry ngOnInit, studentGUID = ' + this.studentGUId);
    this.fetchFilteredData();
  }


  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
      this.isLoading = true;
      this.becaData.getStudentGrades(this.studentGUId).subscribe(
        (dataArray) => {
          // if want to have all empty ones, not just latest:
          // this.studentGradesData = dataArray.filter(this.filter_dates);
          // get latest one
          this.studentGradesData = dataArray.slice(0, 1);
        },
        (err) => {
          console.log('XXE1');
          this.errorMessage = err;
        },
        () => {
          this.studentGradesData.forEach((gradeEntryDataRow) => {
            this.addGradeEntryRow(gradeEntryDataRow);
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

  saveAllChangedEntries() {
    console.log('studentGradesData length is ' + this.studentGradesData.length);
    for (let i = 0; i < this.studentGradesData.length; ++i) {
      console.log('saveEntry ' + i);
      this.saveEntry(i);
    }
    this.myForm.markAsPristine();
  }

  resetAllChangedEntries() {
    console.log('studentGradesData length is ' + this.studentGradesData.length);
    for (let i = 0; i < this.studentGradesData.length; ++i) {
      console.log('saveEntry ' + i);
      this.resetEntry(i);
    }
    this.myForm.markAsPristine();
  }

  retrieveFormValuesForRow(i: number): void {
    console.log('retrieveFormValues for row' + JSON.stringify(this.gradeEntryFormRows().value[i]));
    this.studentGradesData[i] = { ...this.studentGradesData[i], ...this.gradeEntryFormRows().value[i] };
  }

  isRowDirty(i: number): boolean {
    return this.gradeEntryFormRows().controls[i].dirty;
  }

  saveEntry(i: number): boolean {
    console.log('saveEntry for ' + i);
    this.isLoading = true;
    this.errorMessage = '';
    console.log('row dirty value is ' + this.gradeEntryFormRows().controls[i].dirty);
    if (this.gradeEntryFormRows().controls[i].dirty) {
      this.retrieveFormValuesForRow(i);
      this.becaData.updateStudentGrades(this.studentGradesData[i]).subscribe(
        (gradeRowData) => {
          console.log('subscribe result in updateGradeRowData');
          console.log(JSON.stringify(gradeRowData));
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Los cambios se guardaron con éxito.';
          }, 0);
          const currRowFormGroup = this.gradeEntryFormRows().controls[i] as UntypedFormGroup;
          // this fails for some reason, and isn't needed because the update won't change any of these values
          // this.updateGradeEntryRow(currRowFormGroup, gradeRowData);
          currRowFormGroup.markAsPristine();
          // this.successMessage = 'Changes were saved successfully.';
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {
            // console.log('clearing success message');
            this.successMessage = '';
          }, 15000);
        },
        () => {
          this.errorMessage = 'Por favor, compruebe el formato de la fecha. Debe ser AAAA-MM-DD';
          this.isLoading = false;
        }
      );
    }
    // prevent default action of reload
    return false;
  }

  resetEntry(i: number): boolean {
    console.log('resetEntry for ' + i);

    if (this.gradeEntryFormRows().controls[i].dirty) {
      this.retrieveFormValuesForRow(i);
      this.gradeEntryFormRows().controls[i].reset();
      this.gradeEntryFormRows().controls[i].markAsPristine();
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
}
