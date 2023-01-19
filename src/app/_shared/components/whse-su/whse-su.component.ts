import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SUCount } from '../../models/WHSE_SUCount';


@Component({
  selector: 'whse-su',
  templateUrl: 'whse-su.component.html'
})

export class WHSE_SU_Component implements OnInit {

  isLoading: boolean;
  whseSU: WHSE_SUCount[];
  Highcharts: typeof Highcharts = Highcharts;
  dummyData =[] as any[];

  myCategories = [1, 2]; // this.dummyData.map(a => a.yearJoined);
  myData0 = this.dummyData.map(a => a.universityAbbrev);
  // myData1 = this.dummyData.map(a => a.universigyName);
  myData2 = this.dummyData.map(a => a.numberStudents);


  chartOptions: Highcharts.Options = {
    chart: {
      renderTo: 'container',
      type: 'column'
  },
  title: {
      text: 'Restaurants Complaints'
  },
  tooltip: {
      shared: true
  },
  xAxis: {
      categories: [
          'Overpriced',
          'Small portions',
          'Wait time',
          'Food is tasteless',
          'No atmosphere',
          'Not clean',
          'Too noisy',
          'Unfriendly staff'
      ],
      crosshair: true
  },
  yAxis: [{
      title: {
          text: ''
      }
  }, {
      title: {
          text: ''
      },
      minPadding: 0,
      maxPadding: 0,
      max: 100,
      min: 0,
      opposite: true,
      labels: {
          format: '{value}%'
      }
  }],
  series: [{
      type: 'pareto',
      name: 'Pareto',
      yAxis: 1,
      zIndex: 10,
      baseSeries: 1,
      tooltip: {
          valueDecimals: 2,
          valueSuffix: '%'
      }
  }, {
      name: 'Complaints',
      type: 'column',
      zIndex: 2,
      data: [755, 222, 151, 86, 72, 51, 36, 10]
  }]

  };

  constructor(public whseData: WHSE_DataService) {
  }
  public ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getWHSE_SU');
    this.whseData.getWHSE_SU().subscribe(
      (data) => {
        this.whseSU = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('Students per University ' + this.whseSU.length + ' rows');
        console.log(JSON.stringify(this.whseSU));
        this.setHighchartValues(this.whseSU);
        this.isLoading = false;
      }
    );
  }

  setHighchartValues(hcValues: any) {
    // this.myCategories = hcValues.map(a => a.yearPeriod);
    this.myData0 = hcValues.map(a => a.universityAbbrev);
    // this.myData1 = hcValues.map(a => a.universigyName);
    this.myData2 = hcValues.map(a => a.numberStudents);

    let chart = Highcharts.chart('container', this.chartOptions);
    // chart.xAxis[0].setCategories(this.myCategories);
    chart.series[0].setData(this.myData0);
    // chart.series[1].setData(this.myData1);
    chart.series[2].setData(this.myData2);
  }


}
