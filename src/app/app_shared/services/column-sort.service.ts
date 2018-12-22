import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SORTCRITERIA } from '../interfaces/SORTCRITERIA';
import { isNumber } from 'util';

@Injectable({ providedIn: 'root' })
export class ColumnSortService {

  private columnSortedSource = new Subject<SORTCRITERIA>();

  columnSorted$ = this.columnSortedSource.asObservable();

  constructor() { }

  columnSorted(event: SORTCRITERIA) {
        this.columnSortedSource.next(event);
  }


  compareValues(a: any, b: any, sortCriteria: SORTCRITERIA) {
    if (sortCriteria.sortDirection === 'asc') {
      // console.log('asc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
      if (isNumber(a[sortCriteria.sortColumn])) {
        if (a[sortCriteria.sortColumn] === b[sortCriteria.sortColumn]) {
          return 0;
        } else {
          return (a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn]) ? 1 : -1;
        }
      }
      // console.log('desc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
      return a[sortCriteria.sortColumn].localeCompare(b[sortCriteria.sortColumn]);

    } else {
      // console.log('desc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
      if (isNumber(a[sortCriteria.sortColumn])) {
        if (a[sortCriteria.sortColumn] === b[sortCriteria.sortColumn]) {
          return 0;
        } else {
          return (a[sortCriteria.sortColumn] < b[sortCriteria.sortColumn]) ? 1 : -1;
        }
      }
      return b[sortCriteria.sortColumn].localeCompare(a[sortCriteria.sortColumn]);
    }
  }

}
