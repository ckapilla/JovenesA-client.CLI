import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradesGivenEntryDTO } from 'src/app/_shared/models/grades-given-entryDTO';
import { BecaDataService } from 'src/app/_shared/services/beca-data.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css']
})


export class GradesListComponent implements OnInit {

  studentDTO: StudentDTO;
  gradesGivenEntryDTOs: GradesGivenEntryDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  years: SELECTITEM[];
  months: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;

  constructor(
    public becaData: BecaDataService,
    public router: Router,
    // private route: ActivatedRoute,
    public studentSelected: StudentSelectedService,
    private session: SessionService,
    private columnSorter: ColumnSortService
  ) {

    console.log('Hi from grades List Ctrl controller function');

    this.years = constants.years;
    this.months = constants.months;

    const today = new Date();
    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedMonth = '1'; //  + today.getMonth() + 1;// '5';

    this.isLoading = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.processRouteParams();
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    this.isLoading = true;
    this.becaData.getGradesListEntryDTOs()
      .subscribe(
        data => { this.gradesGivenEntryDTOs = data; },
        err => { this.errorMessage = err; },
        () => {
          // this.gradesGivenEntryDTOs = this.gradesGivenEntryDTOs.filter(s => s.studentId !== 275); // N/A
          console.log(this.gradesGivenEntryDTOs[0]);
          console.log('data loaded now set timeout for scroll');
          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        }
      );
  }

  scrollIntoView() {

    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }


  getNumericStatus(studentDTO: StudentDTO): StudentDTO {

    studentDTO.numericGradeRptStatus = 0;
    if (studentDTO.gradeRptStatus === 'red') {
      studentDTO.numericGradeRptStatus = 1;
    } else if (studentDTO.gradeRptStatus === 'yellow') {
      studentDTO.numericGradeRptStatus = 2;
    } else if (studentDTO.gradeRptStatus === 'green') {
      studentDTO.numericGradeRptStatus = 3;
    }

    studentDTO.numericGPAStatus = 0;
    if (studentDTO.gpaStatus === 'red') {
      studentDTO.numericGPAStatus = 1;
    } else if (studentDTO.gpaStatus === 'yellow') {
      studentDTO.numericGPAStatus = 2;
    } else if (studentDTO.gpaStatus === 'green') {
      studentDTO.numericGPAStatus = 3;
    }

    return studentDTO;
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
    this.fetchFilteredData();
  }
  setSelectedMonth(month: string) {
    this.selectedMonth = month;
    this.fetchFilteredData();
  }

  gotoStudent(studentGUId: string, studentName: string) {

    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    this.studentSelected.notifyNewStudentGUId(studentGUId);
    const link = ['becas/grades-edit']; // , { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.gradesGivenEntryDTOs.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

}
