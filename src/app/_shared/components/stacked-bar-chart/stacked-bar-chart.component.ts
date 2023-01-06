import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

/**
 * This class represents the lazy loaded BecasHomeComponent.
 */
@Component({
  selector: 'stacked-bar-chart',
  templateUrl: 'stacked-bar-chart.component.html',
  standalone: true,
  imports: [HighchartsChartModule]
})

export class StackedBarChartComponent {
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
  constructor() {
    // nada
  }

}
