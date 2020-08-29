import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GradesGivenEntryDTO } from 'src/app/_shared/models/grades-given-entryDTO';
import { StudentGrades } from 'src/app/_shared/models/student-grades';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { BecaDataService } from 'src/app/_shared/services/beca-data.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
// import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';

@Component({
	templateUrl: './grades-edit.component.html',
	styleUrls: [ './grades-edit.component.css' ]
})
export class GradesEditComponent implements OnInit, OnDestroy {
	myForm: FormGroup;
	studentDTO: StudentDTO;
	// gradesGivenEntryDTOs: GradesGivenEntryDTO[];
	studentGradesData: StudentGrades[];
	entry: GradesGivenEntryDTO;
	isLoading: boolean;
	errorMessage: string;
	successMessage: string;
	// sortCriteria: SORTCRITERIA;
	years: SELECTITEM[];
	months: SELECTITEM[];
	studentGUId: string;
	private subscription: Subscription;
	studentName: string;

	constructor(
		public becaData: BecaDataService,
		public router: Router,
		// private route: ActivatedRoute,
		private session: SessionService,
		private columnSorter: ColumnSortService,
		private _fb: FormBuilder,
		private studentSelected: StudentSelectedService,
		public location: Location
	) {
		console.log('Hi from gradesEdit Ctrl controller function');

		this.isLoading = false;
		this.studentName = session.getStudentInContextName();

		this.myForm = this._fb.group({
			studentId: [ '' ],
			gradeEntryRows: this._fb.array([])
		});
	}

	gradeEntryRows(): FormArray {
		return <FormArray>this.myForm.get('gradeEntryRows');
	}

	createEmptyGradeEntryRow(): FormGroup {
		console.log('CreateEmptyGradeEntry create empty row to be populated');
		return this._fb.group({
			gradesGivenDate: { value: '', disabled: true },
			gradesDueDate: { value: '', disabled: true },
			gradesTurnedInDate: [
				{ value: '' },
				Validators.compose([ Validators.pattern(/^\d{4}\-\d{1,2}\-\d{1,2}$/), Validators.maxLength(10) ])
			],
			gradePointAvg: [ { value: '' }, Validators.pattern(/^\d{1,2}\.\d{1,1}$/) ],
			gradesTurnedInException: [ '' ],
			gradePointAvgException: [ '' ]
		});
	}

	updateGradeEntryRow(gradeEntryRow: FormGroup, entryData: StudentGrades): FormGroup {
		console.log('updateGradeEntryRow update existing row with actual data');
		console.log(JSON.stringify(entryData));
		gradeEntryRow.patchValue({
			gradesGivenDate: new TruncateDatePipe().transform('' + entryData.gradesGivenDate),
			gradesDueDate: new TruncateDatePipe().transform('' + entryData.gradesDueDate),
			gradesTurnedInDate: new TruncateDatePipe().transform('' + entryData.gradesTurnedInDate),
			gradePointAvg: this.toFixedValue(entryData.gradePointAvg),
			gradesTurnedInException: entryData.gradesTurnedInException,
			gradePointAvgException: entryData.gradePointAvgException
		});
		gradeEntryRow.markAsPristine();
		return gradeEntryRow;
	}

	addGradeEntryRow(gradeEntryData: StudentGrades) {
		const gradeEntryRow: FormGroup = this.createEmptyGradeEntryRow();

		this.updateGradeEntryRow(gradeEntryRow, gradeEntryData);
		console.log('addGradeEntry: push new populated row intoFormArray');
		this.gradeEntryRows().push(gradeEntryRow);
	}

	ngOnInit() {
		console.log('gradesEdit ngOnInit');
		// this.processRouteParams();

		this.subscribeForStudentGUIds();
	}

	ngOnDestroy() {
		// console.log('{{{{{{{{{{{{GE ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
		this.subscription.unsubscribe();
	}

	subscribeForStudentGUIds() {
		console.log('GradesEdit set up studentGUId subscription');
		this.subscription = this.studentSelected.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('SR new StudentGUId received' + this.studentGUId);
			if (this.studentGUId && this.studentGUId !== '0000') {
				this.fetchFilteredData();
			}
		});
	}

	fetchFilteredData() {
		if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {
			this.isLoading = true;
			this.becaData.getStudentGrades(this.studentGUId).subscribe(
				(data) => {
					this.studentGradesData = data;
				},
				(err) => {
					this.errorMessage = err;
				},
				() => {
					// this.studentGradesData = this.studentGradesData.filter(s => s.studentId !== 275); // N/A
					this.studentGradesData.forEach((gradeEntryData) => {
						this.addGradeEntryRow(gradeEntryData);
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
		this.session.setStudentInContextName(studentName);
		const link = [ 'admins/students/student', { guid: guid } ];

		console.log('navigating to ' + link);
		this.router.navigate(link);
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
		console.log('retrieveFormValues for row' + JSON.stringify(this.gradeEntryRows().value[i]));
		this.studentGradesData[i] = { ...this.studentGradesData[i], ...this.gradeEntryRows().value[i] };
	}

	isRowDirty(i: number): boolean {
		// console.log('checking dirty state of i ' + i + ' -- ' + this.gradeEntryRows().controls[i].dirty);
		return this.gradeEntryRows().controls[i].dirty;
	}

	saveEntry(i: number): boolean {
		console.log('saveEntry for ' + i);
		this.isLoading = true;
		this.errorMessage = '';
		console.log('row dirty value is ' + this.gradeEntryRows().controls[i].dirty);
		if (this.gradeEntryRows().controls[i].dirty) {
			this.retrieveFormValuesForRow(i);
			this.becaData.updateStudentGrades(this.studentGradesData[i]).subscribe(
				(gradeRowData) => {
					console.log('subscribe result in updateGradeRowData');
					console.log(JSON.stringify(gradeRowData));
					// need timeout to avoid "Expression has changed error"
					window.setTimeout(() => {
						this.successMessage = 'Changes were saved successfully.';
					}, 0);
					const currRowFormGroup = this.gradeEntryRows().controls[i] as FormGroup;
					// this fails for some reason, and isn't needed because the update won't change any of these values
					// this.updateGradeEntryRow(currRowFormGroup, gradeRowData);
					currRowFormGroup.markAsPristine();
					// this.successMessage = 'Changes were saved successfully.';
					this.isLoading = false;
					window.scrollTo(0, 0);
					window.setTimeout(() => {
						// console.log('clearing success message');
						this.successMessage = '';
					}, 3000);
				},
				(error) => {
					this.errorMessage = 'Please check Date Format, must be YYYY-MM-DD';
					this.isLoading = false;
				}
			);
		}
		// prevent default action of reload
		return false;
	}

	resetEntry(i: number): boolean {
		console.log('resetEntry for ' + i);

		if (this.gradeEntryRows().controls[i].dirty) {
			this.retrieveFormValuesForRow(i);
			this.gradeEntryRows().controls[i].reset();
			this.gradeEntryRows().controls[i].markAsPristine();
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

		const strDate = [ d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2) ].join(
			'-'
		);

		const gradeEntryRow: FormGroup = this.gradeEntryRows().controls[i] as FormGroup;

		gradeEntryRow.patchValue({
			gradesTurnedInDate: strDate
		});
		gradeEntryRow.markAsDirty();
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
