import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  selector: 'app-quarterly-home',
  templateUrl: './quarterly-home.component.html'
})
export class QuarterlyHomeComponent implements OnInit {
  years: SELECTITEM[];
  periods: SELECTITEM[];
  selectedYear: string;
  selectedPeriod: string;
  studentGUId: string;
  constructor(
    private route: ActivatedRoute
  ) {
    this.years = constants.years;
    this.periods = constants.periods;

    this.selectedYear = '2019'; // '' + today.getFullYear(); //
    this.selectedPeriod = '4'; // + today.getPeriod() + 1;// '5';

  }



  ngOnInit() {
    this.processRouteParams();

  }

  processRouteParams() {
    console.log(' getting studentGUId from queryParams');

    const studentGUIdQueryParam = this.route.snapshot.queryParams['studentGUId'];
    if (studentGUIdQueryParam) {
      console.log('QHome: have studentGUId from route ' + studentGUIdQueryParam);
    }
  }


  setSelectedYear(year: string) {
    this.selectedYear = year;
  }
  setSelectedPeriod(period: string) {
    this.selectedPeriod = period;
  }


}
