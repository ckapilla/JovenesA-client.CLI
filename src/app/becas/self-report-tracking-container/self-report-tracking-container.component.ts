import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedYearPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-self-report-tracking-container',
  templateUrl: './self-report-tracking-container.component.html'
})
export class SelfReportTrackingContainerComponent implements OnInit {
  studentGUId: string;
  studentGUIdReceived: boolean;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedYearPeriod = '';
  subscription: Subscription;

  @Select(UIState.getSelectedYearPeriod) selectedYearPeriod$: Observable<string>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.studentGUIdReceived = false;
  }

  ngOnInit() {
    this.subscribeForSelectedYearPeriod();
  }

  subscribeForSelectedYearPeriod() {
    this.subscription = this.selectedYearPeriod$.subscribe((message) => {
      this.selectedYearPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedYearPeriod received' + this.selectedYearPeriod);
      // this.fetchFilteredData();
    });
  }

  // processRouteParams() {
  //   console.log(' getting studentGUId from queryParams');

  //   const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
  //   if (studentGUIdQueryParam) {
  //     console.log('container: have studentGUId from route ' + studentGUIdQueryParam);
  //   }
  // }

  setSelectedYearPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedYearPeriod(yearPeriod));
    // this.fetchFilteredData();
  }
}
