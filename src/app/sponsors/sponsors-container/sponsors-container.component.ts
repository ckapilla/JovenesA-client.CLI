import { Component, OnInit } from '@angular/core';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { constants } from 'src/app/_shared/constants/constants';

@Component({
  templateUrl: './sponsors-container.component.html'
})
export class SponsorsContainerComponent implements OnInit {
  isLoading = false;
  years: SELECTITEM[];
  periods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  constructor() {
    this.years = constants.years;
    this.periods = constants.periods;

    this.selectedYear = '2019'; // '' + today.getFullYear(); //
    this.selectedPeriod = '4'; // + today.getPeriod() + 1;// '5';
  }

  ngOnInit() {
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
  }
  setSelectedPeriod(period: string) {
    this.selectedPeriod = period;
  }

}
