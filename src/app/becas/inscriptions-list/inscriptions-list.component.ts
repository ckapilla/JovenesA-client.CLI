import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { PROCESSINGPERIOD } from 'src/app/_shared/interfaces/PROCESSINGPERIOD';
import { constants } from '../../_shared/constants/constants';
import { InscriptionDataService } from '../../_shared/data/inscription-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { InscriptionEntryDTO } from '../../_shared/models/inscription-entryDTO';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { SetSelectedStudentIdentifiers } from '../../_store/student/student.action';
import { SetSelectedInscriptionsProcessingPeriodID } from '../../_store/ui/ui.action';
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
  inscriptionsProcessingPeriods: PROCESSINGPERIOD[];
  selectedYear: string;
  selectedMonth: string;
  displayTestNames: boolean;
  selectedAcademicTermId = '';
  staticUrlPrefix: string;
  periodStart: string;
  private subscription: Subscription;

  testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
  selectedAcademicTermId$ = this.store.select<string>(UIState.getSelectedAcademicTermId);

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
    this.inscriptionsProcessingPeriods = constants.inscriptionsProcessingPeriods;
    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedAcademicTermId();
  }

  subscribeForselectedAcademicTermId() {
    this.subscription = this.selectedAcademicTermId$.subscribe((message) => {
      this.selectedAcademicTermId = message;
      console.log('************NGXS: InscriptionsList new selectedAcademicTermId received' + this.selectedAcademicTermId);
      this.fetchFilteredData();
    });
  }

  fetchFilteredData() {
    this.isLoading = true;
    console.log('displayTestNames: ' + this.displayTestNames);
    this.inscriptionData.getInscriptionsListForPeriod(+this.selectedAcademicTermId).subscribe(
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
        console.log('inscription data loaded now set timeout for scroll');
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

  setSelectedAcademicTermId(academicTermID: string) {
    this.store.dispatch(new SetSelectedInscriptionsProcessingPeriodID(academicTermID));
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