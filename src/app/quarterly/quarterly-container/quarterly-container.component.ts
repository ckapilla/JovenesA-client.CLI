import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-quarterly-container',
  templateUrl: './quarterly-container.component.html'
})
export class QuarterlyContainerComponent implements OnInit {
  years: SELECTITEM[];
  periods: SELECTITEM[];
  activeQRPeriods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  selectedYearPeriod: string;
  studentGUId: string;
  studentGUIdReceived: boolean;
  constructor(
    private route: ActivatedRoute
  ) {
    this.years = constants.years;
    this.periods = constants.periods;
    this.activeQRPeriods = constants.activeQRperiods;

    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = constants.selectedYearPeriod; // '2020-2';
    this.studentGUIdReceived = false;
  }

  ngOnInit() {
    this.processRouteParams();

  }

  processRouteParams() {
    console.log(' getting studentGUId from queryParams');

    const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
    if (studentGUIdQueryParam) {
      console.log('Qcontainer: have studentGUId from route ' + studentGUIdQueryParam);
    }
  }


  // setSelectedYear(year: string) {
  //   this.selectedYear = year;
  // }
  // setSelectedPeriod(period: string) {
  //   this.selectedPeriod = period;
  // }
  setSelectedYearPeriod(yearPeriod: string) {
    this.selectedYearPeriod = yearPeriod;
    this.selectedYear = yearPeriod.substr(0, 4);
    this.selectedPeriod = yearPeriod.substr(5, 1);
  }
  onStudentGUIdReceived(bSet: boolean) {
    this.studentGUIdReceived = bSet;
  }

}
