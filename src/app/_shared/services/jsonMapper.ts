[{"YearMonth":"2020-Jan","Problems":7,"AllGood":55,"Celebrate":19,"Concerned":0},
{"YearMonth":"2020-Feb","Problems":6,"AllGood":52,"Celebrate":20,"Concerned":0},
{"YearMonth":"2020-Mar","Problems":5,"AllGood":57,"Celebrate":8,"Concerned":0},
{"YearMonth":"2021-Feb","Problems":1,"AllGood":53,"Celebrate":5,"Concerned":0},
{"YearMonth":"2021-Jun","Problems":2,"AllGood":60,"Celebrate":7,"Concerned":0}]

var jsonArray = [
    {name: "series1", data: [{x: 1, y:2}, {x: 2, y:4}, {x: 3, y:8}]},
    {name: "series2", data: [{x: 1, y:1}, {x: 2, y:2}, {x: 3, y:3}]}
  ];

  var highchartsData = jsonArray.map(function(item) {
    return {
      name: item.name,
      data: item.data.map(function(dataItem){
          return {
              x: dataItem.x,
              y: dataItem.y
          }
      })
    }
  });



var series, data, parts, x;

data = [{
    name: "12/11",
    y: [21.00, 4.82]
},{
    name: "12/10",
    y: [19.72, 4.83]
},{
    name: "12/09",
    y: [18.14, 4.99]
},{
    name: "12/08",
    y: [16.72, 5.45]
},{
    name: "12/07",
    y: [14.49, 5.20]
},{
    name: "12/06",
    y: [13.32, 4.98]
},{
    name: "12/05",
    y: [12.23, 5.19]
},{
    name: "12/04",
    y: [10.67, 4.92]
},{
    name: "12/03",
    y: [9.42, 4.92]
}];


series = [{
    data: []
}, {
    data: []
}];


for (var i = 0, l = data.length; i < l; i++) {
    series[0].data[i] = [x, data[i].y[0]];
}


// var chart = new Highcharts.Chart({
//     chart: {
//         renderTo: 'container'
//     },
//     xAxis: {
//         type: 'datetime'
//     },
//     series: series
// });