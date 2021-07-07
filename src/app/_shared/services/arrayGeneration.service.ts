import { Injectable } from '@angular/core';
import { SELECTITEM } from '../interfaces/SELECTITEM';


@Injectable({ providedIn: 'root' })
export class ArrayGenerationService {

  constructor() {
    ;
  }

  /*
  const activeQRperiods: SELECTITEM[] = [
    { value: '2019-3', label: '2019 3:Jul-Set' },
    { value: '2019-4', label: '2019 4:Oct-Dic' },
    { value: '2020-1', label: '2020 1:Ene-Mar' },
    { value: '2020-2', label: '2020 2:Abr-Jun' },
    { value: '2020-3', label: '2020 3:Jul-Set' },
    { value: '2020-4', label: '2020 4:Oct-Dic' },
    { value: '2021-1', label: '2021 1:Ene-Mar' },
    { value: '2021-2', label: '2021 2:Abr-Jun' },
  ];

  */



  public generateActiveQRPeriods() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    const thisMonth = now.getMonth();
    const thisQtr = Math.floor(thisMonth/3);
    const elem: SELECTITEM =  { value: '', label: '' };

    console.log('------');



    const periodStrings: string[] = ['', '1:Ene-Mar', '2:Abr-Jun', '3:Jul-Set', '4:Oct-Dic' ];
    const activeQRperiods: SELECTITEM[] = [];

    let year = 2019;
    let qtr = 1;
    while (year <= thisYear) {
      while (qtr <= 4) {
        console.log('year: ' + year);
        console.log ('qtr: ' + qtr);
        elem.value = year + '-' + qtr ;
        elem.label = periodStrings[qtr];
        activeQRperiods.push(elem);

        qtr++;
      }
      console.log(activeQRperiods);
      qtr = 1;
      year++;
    }

  }
}
