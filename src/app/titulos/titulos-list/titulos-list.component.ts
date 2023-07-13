import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SetSelectedYearJoined } from 'src/app/_store/ui/ui.action';
import { constants } from '../../_shared/constants/constants';
import { TituloDataService } from '../../_shared/data/titulo-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { TitulosGivenEntryDTO } from '../../_shared/models/titulos-given-entryDTO';
import { ColumnSortService } from '../../_shared/services/column-sort.service';
import { SessionService } from '../../_shared/services/session.service';
import { UrlService } from '../../_shared/services/url.service';
import { SetSelectedStudentIdentifiers } from '../../_store/student/student.action';
import { UIState } from '../../_store/ui/ui.state';

@Component({
  templateUrl: './titulos-list.component.html'
})
export class TitulosListComponent implements OnInit {
  studentDTO: StudentDTO;
  titulosGivenEntryDTOs: TitulosGivenEntryDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  years: SELECTITEM[];
  months: SELECTITEM[];
  selectedYear: string;
  selectedMonth: string;
  displayTestNames: boolean;
  selectedYearJoined = '2018';
  staticUrlPrefix: string;
  periodStart: string;
  private subscription: Subscription;

   testNameVisibility$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
   selectedYearJoined$ = this.store.select<string>(UIState.getSelectedYearJoined);

  constructor(
    public tituloData: TituloDataService,
    public router: Router,
    private store: Store,
    private session: SessionService,
    private columnSorter: ColumnSortService,
    private url: UrlService
  ) {
    this.staticUrlPrefix = url.getStaticFilePrefix();

    this.years = constants.contactYears;
    this.months = constants.months;

    this.isLoading = false;
  }

  ngOnInit() {
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.subscribeForselectedYearJoined();
  }

  subscribeForselectedYearJoined() {
    this.subscription = this.selectedYearJoined$.subscribe((message) => {
      this.selectedYearJoined = message;
      console.log('************NGXS: GradesList new selectedGradesProcessingPeriodID received' + this.selectedYearJoined);
      this.fetchFilteredData();
    });
  }


  fetchFilteredData() {

    this.isLoading = true;
    console.log('displayTestNames: ' + this.displayTestNames);
    this.tituloData.getTitulosListForYearJoined(+this.selectedYearJoined).subscribe(
      (data) => {
        this.titulosGivenEntryDTOs = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName?.substring(0,5) !== '_Test') {
            return item;
          }
        });
      },
      (err) => {
        this.errorMessage = err;
      },
      () => {
        console.log(this.titulosGivenEntryDTOs[0]);
        console.log('data loaded now set timeout for scroll');
        setTimeout(() => {
          this.scrollIntoView();
        }, 0);
        this.isLoading = false;
      }
    );
  }

  setselectedYearJoined(yearJoined: string) {
    this.store.dispatch(new SetSelectedYearJoined(yearJoined));
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  gotoStudent(studentGUId: string, studentName: string) {

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
    return this.titulosGivenEntryDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  onSorted($event) {
    console.log('sorted event received');
    console.log($event);
  }
}
