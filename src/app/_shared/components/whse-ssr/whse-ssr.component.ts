import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WHSE_DataService } from '../../data/whse-data.service';
import { WHSE_SSRCount } from '../../models/WHSE_SSRCount';

/**
 * This class represents the lazy loaded BecasHomeComponent.
 */
@Component({
  selector: 'whse-ssr',
  templateUrl: 'whse-ssr.component.html'
})

export class WHSE_SSR_Component implements OnInit {

  isLoading: boolean;
  whseSSR: WHSE_SSRCount[];
  Highcharts = Highcharts;

//   staticData = [
//   {
//     name: 'SSR',
//     x: '2021-1',
//     y: 1,
//   },
//   {
//     name: 'SSR',
//     x: '2021-2',
//     y: 2,
//   },
//   {
//     name: 'SSR',
//     x: '2021-3',
//     y: 3,
//   }

// ]
// mySeriesName = this.staticData[0].name;
// myCategories = this.staticData.map(a => a.x);
// myData = this.staticData.map(a => a.y);

dynamicData =[
// {"yearPeriod":"2019-3","ssrCount":96},
// {"yearPeriod":"2019-4","ssrCount":91},
// {"yearPeriod":"2020-1","ssrCount":85},
// {"yearPeriod":"2020-2","ssrCount":84},
// {"yearPeriod":"2020-3","ssrCount":110},
// {"yearPeriod":"2020-4","ssrCount":102},
// {"yearPeriod":"2021-1","ssrCount":101},
// {"yearPeriod":"2021-2","ssrCount":94},
// {"yearPeriod":"2021-3","ssrCount":121},
// {"yearPeriod":"2021-4","ssrCount":120},
// {"yearPeriod":"2022-1","ssrCount":108},
// {"yearPeriod":"2022-2","ssrCount":107},
// {"yearPeriod":"2022-3","ssrCount":123},
// {"yearPeriod":"2022-4","ssrCount":110}

];




mySeriesName2 = "SSR Submissions";
myCategories2 = this.dynamicData.map(a => a.yearPeriod);
myData2 = this.dynamicData.map(a => a.ssrCount);


  stackedbarchart: any = {
    series: [{
      name: this.mySeriesName2,
      data: this.myData2
  }],
    chart: {
      type: 'column',
    },
    title: {
      text: 'Student Self Reports by Month',
    },
    xAxis: {
      categories: this.myCategories2
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

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

  constructor(public whseData: WHSE_DataService) {

  }
  public ngOnInit() {
    console.log('onInit######');
    // let jsonArray = [
    //   {name: "# Submitted", data: [
    //     {x:'2020-1', y:3},
    //     {x: '2020-2', y:5},
    //     {x: '2020-1', y:1}
    //   ]},
    // ];

    // console.log(JSON.stringify(this.staticData));
    // let parsedData = this.staticData.map(({
    //   name,
    //   yearMonth,
    //   submittedCount
    // }) => ({
    //   name: name,
    //   data: [{
    //     y: submittedCount,
    //     x: yearMonth
    //   }]
    // }))

    // console.log(JSON.stringify(parsedData));
    // // [{"name":"# Submitted","data":[{"x":"2020-1","y":3},{"x":"2020-2","y":5},{"x":"2020-1","y":1}]}]

    // let highchartsData = jsonArray.map(function(item) {
    //   return {
    //     name: item.name,
    //     data: item.data.map(function(dataItem){
    //         return {
    //             x: dataItem.x,
    //             y: dataItem.y
    //         }
    //     })
    //   }
    // });

    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchData for getStudentsSelfReportsByMonth');
    this.whseData.getWHSE_SSR().subscribe(
      (data) => {
        this.whseSSR = data;
        console.log('studentsSelfReportsByMonth');
       // console.log(JSON.stringify(data));
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('StudentsSelfReportsByMonth loaded ' + this.whseSSR.length + ' rows');
        console.log(JSON.stringify(this.whseSSR));
        this.dynamicData = this.whseSSR;
        this.setHighchartValues(this.dynamicData);
        this.isLoading = false;
      }
    );
  }
  setHighchartValues(hcValues: any) {
    this.myCategories2 = hcValues.map(a => a.yearPeriod);
    this.myData2 = hcValues.map(a => a.ssrCount);
  }


}
