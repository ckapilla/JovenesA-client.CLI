import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SORTCRITERIA } from '../interfaces/SORTCRITERIA';

@Injectable({ providedIn: 'root' })
export class ColumnSortService {

  private columnSortedSource = new Subject<SORTCRITERIA>();

  columnSorted$ = this.columnSortedSource.asObservable();

  constructor() { }

  columnSorted(event: SORTCRITERIA) {
    this.columnSortedSource.next(event);
  }
  isNumber(x: any): boolean {
    return !isNaN(+x);
  }

  compareValues(a: any, b: any, sortCriteria: SORTCRITERIA) {
    // if 'Cannot read property 'localeCompare' of null' exception check validity of source in column header def
    // alternatively the parameter a or b may be null; try using '' or 0 in place of nulls
    if (sortCriteria.sortDirection === 'asc') {
      // console.log(a);
      // console.log(b);
      // console.log('asc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
      if (this.isNumber(a[sortCriteria.sortColumn])) {
        if (a[sortCriteria.sortColumn] === b[sortCriteria.sortColumn]) {
          return 0;
        } else {
          return (a[sortCriteria.sortColumn] > b[sortCriteria.sortColumn]) ? 1 : -1;
        }
      }
      return a[sortCriteria.sortColumn].localeCompare(b[sortCriteria.sortColumn]);

    } else {
      // console.log('desc ' + a[sortCriteria.sortColumn] + ' ' + b[sortCriteria.sortColumn]);
      if (this.isNumber(a[sortCriteria.sortColumn])) {
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
