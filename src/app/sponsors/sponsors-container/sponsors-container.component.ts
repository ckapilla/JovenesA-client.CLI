import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SetQRComponentsEditable, SetSelectedYearPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
  templateUrl: './sponsors-container.component.html'
})
export class SponsorsContainerComponent implements OnInit {
  isLoading = false;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  studentGUId: string;
  studentGUIdReceived: boolean;
  selectedYearPeriod: string;
  private subscription: Subscription;

  @Select(UIState.getSelectedYearPeriod) selectedYearPeriod$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.setQRComponentsEditible(false);
    this.subscribeForSelectedYearPeriod();
  }

  subscribeForSelectedYearPeriod() {
    this.subscription = this.selectedYearPeriod$.subscribe((message) => {
      this.selectedYearPeriod = message;
      console.log('************NGXS: SR new selectedYearPeriod received' + this.selectedYearPeriod);
    });
  }

  setSelectedYearPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedYearPeriod(yearPeriod));
  }
  setQRComponentsEditible(qrComponentsEditable: boolean) {
    this.store.dispatch(new SetQRComponentsEditable(qrComponentsEditable));
  }
}
