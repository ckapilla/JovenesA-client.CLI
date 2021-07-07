import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetselectedQRPeriod } from 'src/app/_store/ui/ui.action';
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
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedQRPeriod = '';
  subscription: Subscription;

  @Select(UIState.getselectedQRPeriod) selectedQRPeriod$: Observable<string>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.studentGUIdReceived = false;
  }

  ngOnInit() {
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
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

  setselectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetselectedQRPeriod(yearPeriod));
    // this.fetchFilteredData();
  }
}
