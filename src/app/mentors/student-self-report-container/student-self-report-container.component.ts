import { Component, OnInit } from '@angular/core';
import { constants } from 'src/app/_shared/constants/constants';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';

@Component({
  selector: 'student-self-report-container',
  templateUrl: './student-self-report-container.component.html'
})
export class StudentSelfReportContainerComponent implements OnInit {
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

    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = constants.selectedYearPeriod;

  }

  ngOnInit() {
  }

  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedYearPeriod = yearPeriod;
    this.selectedYear = yearPeriod.substr(0, 4);
    this.selectedPeriod = yearPeriod.substr(5, 1);
  }

}
