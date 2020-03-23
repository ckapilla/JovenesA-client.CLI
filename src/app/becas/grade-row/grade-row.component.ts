import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentGrades } from 'src/app/_shared/models/student-grades';
import { TruncateDatePipe } from 'src/app/_shared/pipes/truncate-date-pipe';
import { BecaDataService } from '../../_shared/services/beca-data.service';

@Component({
  selector: 'app-grade-row',
  templateUrl: './grade-row.component.html'
})


export class GradeRowComponent implements OnInit, OnChanges {
  myForm: FormGroup;
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;
  @Input() entry: StudentGrades;


  constructor(
    public becaData: BecaDataService,
    public currRoute: ActivatedRoute,
    public _fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    console.log('gradeRow ngOnInit with ' + this.entry.gradesGivenDate);
    this.myForm = this._fb.group({
      studentId: [''],
      gradeMonths: [''],
      gradesGivenDate: ['hello'],
      gradesDueDate: ['hi'],
      gradesTurnedInDate: [''],
      gradePointAvg: ['9.9'],
      gradesTurnedInException: [''],
      gradePointAvgException: ['']
    });



    const ctls = this.myForm.controls;
    this.myForm.valueChanges.subscribe(
      (value: any) => {
        console.log('gradeRow valueChanges fired for form with values');
        console.log(JSON.stringify(value));
        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitted = false;
        // console.log('form change event');
        // this.checkFormControlsAreValid(false);

        ctls.gradesGivenDate.setValue(new TruncateDatePipe().transform('' + this.entry.gradesGivenDate));
        ctls.gradesDueDate.setValue(new TruncateDatePipe().transform('' + this.entry.gradesDueDate));
        ctls.gradesTurnedInDate.setValue(new TruncateDatePipe().transform('' + this.entry.gradesTurnedInDate));
        ctls.gradePointAvg.setValue(this.entry.gradePointAvg);
        ctls.gradesTurnedInException.setValue(this.entry.gradesTurnedInException);
        ctls.gradePointAvgException.setValue(this.entry.gradePointAvgException);
      }
    );
  }

  setFormValues(entry: StudentGrades) {
    console.log('setFormValues');
    console.log('>>>>studentId: ' + entry.studentId);
    console.log('>>>>gradesGivenDate: ' + entry.gradesGivenDate);
    // if (this.myForm) {
    this.myForm.patchValue({
      // studentId: entry.studentId,
      gradesGivenDate: entry.gradesGivenDate,
      gradesDueDate: entry.gradesDueDate,
      gradePointAvg: entry.gradePointAvg
    });
    // }
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('child had new inpout ' + JSON.stringify(changes.entry.currentValue));
    this.setFormValues(changes.entry.currentValue);
  }

  checkFormControlsAreValid(bSubmitting: boolean): boolean {
    console.log('checking for valid form controls');
    const allCorrect = true;
    this.errorMessage = '';

    window.scrollTo(0, 0);
    return allCorrect;
  }
}
