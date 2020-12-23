import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from 'src/app/_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from 'src/app/_shared/models/studentDTO';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SessionService } from 'src/app/_shared/services/session.service';
import { SetPhotoPathname, SetSelectedStudentGUId, SetSelectedStudentMentorGUId, SetSelectedStudentName } from 'src/app/_store/student/student.action';
import {
  SetSelectedFilterMode,
  SetSelectedGradYear,
  SetSelectedStudentStatus,
  SetSelectedYearJoined
} from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';



@Component({
  selector: 'app-admins-student-list',
  templateUrl: './admins-student-list.component.html',
  styleUrls: ['./admins-student-list.component.css']
})
export class AdminsStudentListComponent implements OnInit {
  selectedFilterMode: string;
  selectedStudentStatus: string;
  selectedYearJoined: string;
  selectedGradYear: string;

  studentDTO: StudentDTO;
  studentDTOs: StudentDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  readonly studentStatuses: SELECTITEM[] = constants.studentStatuses;
  readonly joinedYears: SELECTITEM[] = constants.joinedYears;
  readonly gradYears: SELECTITEM[] = constants.gradYears;
  readonly smileys: string[] = constants.smileys;
  displayTestNames: boolean;

  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;
  @Select(UIState.getSelectedGradYear) selectedGradYear$: Observable<string>;
  @Select(UIState.getSelectedYearJoined) selectedYearJoined$: Observable<string>;
  @Select(UIState.getSelectedStudentStatus) selectedStudentStatus$: Observable<string>;
  @Select(UIState.getSelectedFilterMode) selectedFilterMode$: Observable<string>;

  constructor(
    public studentData: StudentDataService,
    public router: Router,
    public store: Store,
    private session: SessionService,
    private columnSorter: ColumnSortService
  ) {
    console.log('Hi from student List constructor function');

    this.isLoading = false;

    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
      // this.fetchFilteredData();
    });

    this.selectedFilterMode$.subscribe((status) => {
      console.log('selectedFilterMode set to ' + status);
      this.selectedFilterMode = status;
    });

    this.selectedStudentStatus$.subscribe((status) => {
      console.log('selectedStudentStatus set to ' + status);
      this.selectedStudentStatus = status;
    });

    this.selectedGradYear$.subscribe((year) => {
      console.log('selectedGradYear set to ' + year);
      this.selectedGradYear = year;
    });

    this.selectedYearJoined$.subscribe((year) => {
      console.log('selectedYearJoined set to ' + year);
      this.selectedYearJoined = year;
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchFilteredData();
  }

  setSelectedFilterMode(filterMode: string) {
    console.log('ORIG selected filterMode: ' + this.selectedFilterMode);
    console.log('new selected filterMode: ' + filterMode);
    this.selectedFilterMode = filterMode;
    if (filterMode === '999') {
      // use filterMode only
      this.selectedStudentStatus = '1005';
      this.selectedGradYear = '0';
      this.selectedYearJoined = '0';
    } // else {
    //   this.selectedStudentStatus = '1005'; // current
    // }
    this.store.dispatch(new SetSelectedStudentStatus(this.selectedStudentStatus));
    this.store.dispatch(new SetSelectedFilterMode(filterMode));
    this.store.dispatch(new SetSelectedGradYear(this.selectedGradYear));
    this.store.dispatch(new SetSelectedYearJoined(this.selectedYearJoined));
    this.fetchFilteredData();
  }

  setSelectedStudentStatus(status: string) {
    console.log('setting selectedStudent status: ' + status);
    this.selectedStudentStatus = status;
    this.store.dispatch(new SetSelectedStudentStatus(status));
    this.fetchFilteredData();
  }

  setSelectedGradYear(year: string) {
    console.log('setting SelectedGradYear: ' + year);
    this.selectedGradYear = year;
    this.store.dispatch(new SetSelectedGradYear(year));
    this.fetchFilteredData();
  }

  setSelectedYearJoined(year: string) {
    console.log('setting SelectedYearJoined: ' + year);
    this.selectedYearJoined = year;
    this.store.dispatch(new SetSelectedYearJoined(year));
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    console.log('in fetchFilteredData with ' + this.selectedFilterMode);

    if (
      // eslint-disable-next-line no-constant-condition
      !(
        false
        // this.selectedFilterMode === '-1' &&
        // this.selectedStudentStatus === '-1' &&
        // this.selectedYearJoined === '0' &&
        // this.selectedGradYear === '0'
      )
    ) {
      this.isLoading = true;
      this.studentData
        .getStudentDTOsByStatusAndYear(
          this.selectedFilterMode,
          this.selectedStudentStatus,
          this.selectedYearJoined,
          this.selectedGradYear
        )
        .subscribe(
          (data) => {
            this.studentDTOs = data
              .filter((item) => {
                if (this.displayTestNames) {
                  return item;
                } else if (!this.displayTestNames && item.studentName !== '_Test, _Student') {
                  return item;
                }
              })
              .map(this.getNumericStatus);
          },
          (err) => {
            this.errorMessage = err;
          },
          () => {
            console.log(this.studentDTOs[0]);
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

  getNumericStatus(studentDTO: StudentDTO): StudentDTO {
    studentDTO.numericTimelyMentorMeetingStatus = 0;
    if (studentDTO.timelyMentorMeetingStatus === 'red') {
      studentDTO.numericTimelyMentorMeetingStatus = 1;
    } else if (studentDTO.timelyMentorMeetingStatus === 'yellow') {
      studentDTO.numericTimelyMentorMeetingStatus = 2;
    } else if (studentDTO.timelyMentorMeetingStatus === 'green') {
      studentDTO.numericTimelyMentorMeetingStatus = 3;
    }

    studentDTO.numericTimelyMentorReportStatus = 0;
    if (studentDTO.timelyMentorReportStatus === 'red') {
      studentDTO.numericTimelyMentorReportStatus = 1;
    } else if (studentDTO.timelyMentorReportStatus === 'yellow') {
      studentDTO.numericTimelyMentorReportStatus = 2;
    } else if (studentDTO.timelyMentorReportStatus === 'green') {
      studentDTO.numericTimelyMentorReportStatus = 3;
    }

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

  gotoStudent(guid: string, studentName: string,
    photoUrl: string, mentorGUId: string) {
    console.log('setting studentName to ' + studentName);

    this.store.dispatch(new SetPhotoPathname(photoUrl));
    this.store.dispatch(new SetSelectedStudentGUId(guid));
    this.store.dispatch(new SetSelectedStudentName(studentName));
    this.store.dispatch(new SetSelectedStudentMentorGUId(mentorGUId));
    const link = ['admins/students/student-container', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoMentor(guid: string) {
    const link = ['admins/members/member', { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoReport(id: number) {
    const link = ['/admins/students/mentorReports', id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudentSearch() {
    const link = '/admins/students';
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.studentDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }
}
