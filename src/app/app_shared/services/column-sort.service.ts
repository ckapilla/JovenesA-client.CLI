import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SORTCRITERIA } from '../interfaces/SORTCRITERIA';

@Injectable()
export class ColumnSortService {

  private columnSortedSource = new Subject<SORTCRITERIA>();

  columnSorted$ = this.columnSortedSource.asObservable();

  constructor() { }

  columnSorted(event: SORTCRITERIA) {
        this.columnSortedSource.next(event);
  }

}
