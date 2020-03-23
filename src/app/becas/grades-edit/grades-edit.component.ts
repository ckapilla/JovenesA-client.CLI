import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  styleUrls: ['./grades-edit.component.css']
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
  ctls: AbstractControl[];
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
    private studentSelected: StudentSelectedService
  ) {

    console.log('Hi from gradesEdit Ctrl controller function');

    this.isLoading = false;
    this.studentName = session.getStudentInContextName();

    this.myForm = this._fb.group({
      studentId: [''],
      gradeEntryRows: this._fb.array([])
    });

  }

  gradeEntryRows(): FormArray {
    return <FormArray>this.myForm.get('gradeEntryRows');
  }

  createEmptyGradeEntryRow(): FormGroup {
    console.log('CreateEmptyGradeEntry create empty row to be populated');
    return this._fb.group({
      gradesGivenDate: ({ value: '', disabled: true }),
      gradesDueDate: ({ value: '', disabled: true }),
      gradesTurnedInDate: [''],
      gradePointAvg: [''],
      gradesTurnedInException: [''],
      gradePointAvgException: ['']
    });
  }

  updateGradeEntryRow(gradeEntryRow: FormGroup, entryData: StudentGrades): FormGroup {
    console.log('updateGradeEntryRow update existing row with actual data');

    gradeEntryRow.patchValue({
      gradesGivenDate: new TruncateDatePipe().transform('' + entryData.gradesGivenDate),
      gradesDueDate: new TruncateDatePipe().transform('' + entryData.gradesDueDate),
      gradesTurnedInDate: new TruncateDatePipe().transform('' + entryData.gradesTurnedInDate),
      gradePointAvg: entryData.gradePointAvg,
      gradesTurnedInException: [''],
      gradePointAvgException: ['']
    });

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
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }

  subscribeForStudentGUIds() {
    console.log('GradesEdit set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('SR new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.fetchFilteredData();
        }
        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }

  fetchFilteredData() {
    if (this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000') {

      this.isLoading = true;
      this.becaData.getStudentGrades(this.studentGUId)
        .subscribe(
          data => { this.studentGradesData = data; },
          err => { this.errorMessage = err; },
          () => {
            // this.studentGradesData = this.studentGradesData.filter(s => s.studentId !== 275); // N/A
            this.studentGradesData.forEach(gradeEntryData => {
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
    // const idx = this.studentGrades.findIndex(s => s.studentId === id);

    // this.session.setCurrentStudent(this.studentGrades[idx]);
    // const link = ['/admins/grades/student', id];
    const link = ['admins/students/student', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  saveEntry(i: number): boolean {
    console.log('saveEntry for ' + i);

    this.isLoading = true;
    // this.retrieveFormValues();
    this.becaData.updateStudentGrades(this.studentGradesData[i])
      .subscribe(
        (student) => {
          // console.log('subscribe result in updateStudent');
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          // this.successMessage = 'Changes were saved successfully.';
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
            this.myForm.markAsPristine(); // this is oversimplification if multiple dirty rows
          }, 3000);
        },
        (error) => {
          this.errorMessage = <any>error;
          this.isLoading = false;
        }
      );
    // prevent default action of reload
    return false;
  }

  public hasChanges() {
    // if have changes then routing guard will ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    return this.myForm.dirty;
  }


}
