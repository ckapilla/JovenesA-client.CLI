import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';

@Component({
  templateUrl: './sponsors-container.component.html'
})
export class SponsorsContainerComponent implements OnInit {
  isLoading = false;
  years: SELECTITEM[];
  periods: SELECTITEM[];
  activeQRPeriods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  selectedYearPeriod: string;
  constructor() {
    this.years = constants.years;
    this.periods = constants.periods;
    this.activeQRPeriods = constants.activeQRperiods;

    this.selectedYear = '2019'; // '' + today.getFullYear(); //
    this.selectedPeriod = '3'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = '2019-3';

  }

  ngOnInit() {
  }

  setSelectedYear(year: string) {
    this.selectedYear = year;
  }
  setSelectedPeriod(period: string) {
    this.selectedPeriod = period;
  }
  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedYearPeriod = yearPeriod;
    this.selectedYear = yearPeriod.substr(0, 4);
    this.selectedPeriod = yearPeriod.substr(5, 1);
  }

}
