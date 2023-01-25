import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SGCount } from '../../models/WHSE_SGCount';


@Component({
  selector: 'whse-sg',
  templateUrl: 'whse-sg.component.html'
})

export class WHSE_SG_Component implements OnInit {

  isLoading: boolean;
  whseSG: WHSE_SGCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData: any[] =[
    // {"yearPeriod":"2019-3","ssrCount":96},
    ];

  myCategories = this.dummyData.map(a => a.yearJoined);
  myData =this.dummyData.map(a => a.current);

  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'column',
        name: "SSR Submissions",
      }
    ],
    chart: {
      height: 300
    },
    title: {
      text: 'Student Grads',
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
    console.log('in fetchData for getWHSE_SG');
    this.whseData.getWHSE_SG().subscribe(
      (data) => {
        this.whseSG = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentStatus by YearJoined loaded ' + this.whseSG.length + ' rows');
        console.log(JSON.stringify(this.whseSG));
        this.setHighchartValues(this.whseSG);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    this.myCategories = hcValues.map(a => a.yearPeriod);
    this.myData = hcValues.map(a => a.ssrCount);

    let chart = Highcharts.chart('container', this.chartOptions);
    chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData);
  }


}
