import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from '../../_shared/constants/constants';
import { InscriptionDataService } from '../../_shared/data/inscription-data.service';
import { GRADESPROCESSINGPERIOD } from '../../_shared/interfaces/GRADESPROCESSINGPERIOD';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { InscriptionEntryDTO } from '../../_shared/models/inscription-entryDTO';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { SetSelectedStudentIdentifiers } from '../../_store/student/student.action';
import { SetSelectedGradesProcessingPeriodID } from '../../_store/ui/ui.action';
import { UIState } from '../../_store/ui/ui.state';

@Component({
  templateUrl: './inscriptions-list.component.html'
})
export class InscriptionsListComponent implements OnInit {
  studentDTO: StudentDTO;
  inscriptionEntryDTOs: InscriptionEntryDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  years: SELECTITEM[];
  months: SELECTITEM[];
  gradesProcessingPeriods: GRADESPROCESSINGPERIOD[];
  selectedYear: string;
  selectedMonth: string;
  displayTestNames: boolean;
  selectedGradesProcessingPeriodID = '';
  staticUrlPrefix: string;
  periodStart: string;
  private subscription: Subscription;

  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
  selectedGradesProcessingPeriodID$ = this.store.select<string>(UIState.getselectedGradesProcessingPeriodID);

  constructor(
    public inscriptionData: InscriptionDataService,
    public router: Router,
    private store: Store,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private url: UrlService
  ) {
    this.staticUrlPrefix = url.getStaticFilePrefix();

    this.years = constants.contactYears;
    this.months = constants.months;
    this.gradesProcessingPeriods = constants.gradesProcessingPeriods;
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedGradesProcessingPeriodID();
  }

  subscribeForselectedGradesProcessingPeriodID() {
    this.subscription = this.selectedGradesProcessingPeriodID$.subscribe((message) => {
      this.selectedGradesProcessingPeriodID = message;
      console.log('************NGXS: InscriptionsList new selectedGradesProcessingPeriodID received' + this.selectedGradesProcessingPeriodID);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('displayTestNames: ' + this.displayTestNames);
    this.inscriptionData.getInscriptionsListForPeriod(+this.selectedGradesProcessingPeriodID).subscribe(
      (data) => {
        this.inscriptionEntryDTOs = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substring(0,5) !== '_Test') {
            return item;
          }
        });
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log(this.inscriptionEntryDTOs[0]);
        // console.log(JSON.stringify(this.inscriptionEntryDTOs));
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

  // setSelectedYear(year: string) {
  //   this.selectedYear = year;
  //   this.fetchFilteredData();
  // }
  // setSelectedMonth(month: string) {
  //   this.selectedMonth = month;
  //   this.fetchFilteredData();
  // }

  setselectedGradesProcessingPeriodID(gradesProcessingPeriod: string) {
    this.store.dispatch(new SetSelectedGradesProcessingPeriodID(gradesProcessingPeriod));
  }

  confirmInscription(studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));
    const link = ['becas/inscriptions-edit']; // , { guid: guid }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudent(studentGUId: string, studentName: string) {

    // this.store.dispatch(new SetPhotoPathname(photoUrl));
    // this.store.dispatch(new SetSelectedStudentGUId(guid));
    // this.store.dispatch(new SetSelectedStudentName(studentName));
    // this.store.dispatch(new SetSelectedStudentMentorGUId(mentorGUId));
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    const link = ['admins/students/student-container', { guid: studentGUId }];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  isViewLinkHidden(imageSubmittedDate: any) {
    return (imageSubmittedDate === '1900-01-01T00:00:00');
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.inscriptionEntryDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }
}