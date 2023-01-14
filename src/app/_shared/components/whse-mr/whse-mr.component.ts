import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_MR } from '../../models/WHSE_MR';
/**
 * This class represents the lazy loaded BecasHomeComponent.
 */
@Component({
  selector: 'whse-mr',
  templateUrl: 'whse-mr.component.html'
})

export class WHSE_MR_Component implements OnInit {

  isLoading: boolean;
  whseMR: WHSE_MR[];
  Highcharts = Highcharts;
  stackedbarchart: any = {
    series: [
      {
        name:'Problems',
        data: [3, 5, 1, 13],
      },
      {
        name:'AllGood',
        data: [14, 8, 8, 12],
      },
      {
        name:'Celebrate',
        data: [14, 8, 8, 12],
      },
      {
        name:'Concerned',
        data: [0, 2, 6, 3],
      },
    ],
    chart: {
      type: 'column',
    },
    title: {
      text: 'Mentor Reports by Month',
    },
    xAxis: {
      categories: ['2020-Jan',
        '2020-Feb',
        '2020-Mar',
        '2020-Apr',
        '2020-May'
        ]
    },
    yAxis: {
      min: 0
    },
    plotOptions: {
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
  },
  };
  constructor(public whseData: WHSE_DataService) {

  }
  public ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_MR');
    this.whseData.getWHSE_MR().subscribe(
      (data) => {
        this.whseMR = data;
        this.whseMR = [
        {"yearMonth":"2020-Jan","problems":7,"allGood":55,"celebrate":19,"concerned":0},
        {"yearMonth":"2020-Feb","problems":6,"allGood":52,"celebrate":20,"concerned":0},
        {"yearMonth":"2021-Jun","problems":2,"allGood":60,"celebrate":7,"concerned":0}]
        console.log('MentorReportsByMonth');

      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('MentorReportsByMonth loaded ' + this.whseMR.length + ' rows');
        this.isLoading = false;
        console.log(JSON.stringify(this.whseMR));
      }
    );
  }


}
