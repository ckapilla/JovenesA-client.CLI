import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-self-report-tracking-container',
  templateUrl: './self-report-tracking-container.component.html'
})
export class SelfReportTrackingContainerComponent implements OnInit {
  years: SELECTITEM[];
  periods: SELECTITEM[];
  activeQRPeriods: SELECTITEM[];
  selectedYearPeriod: string;
  studentGUId: string;
  studentGUIdReceived: boolean;
  selectedYear: string;
  selectedPeriod: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.years = constants.years;
    this.periods = constants.periods;
    this.activeQRPeriods = constants.activeQRperiods;

    this.selectedYear = '2020'; // '' + today.getFullYear(); //
    this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
    this.selectedYearPeriod = constants.selectedYearPeriod;
    this.studentGUIdReceived = false;
  }

  ngOnInit() {
    this.processRouteParams();

  }

  processRouteParams() {
    console.log(' getting studentGUId from queryParams');

    const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
    if (studentGUIdQueryParam) {
      console.log('container: have studentGUId from route ' + studentGUIdQueryParam);
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
