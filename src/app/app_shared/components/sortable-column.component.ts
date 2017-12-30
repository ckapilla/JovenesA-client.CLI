import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SortService } from '../services/sort.service';

@Component({
    selector: 'app-sortable-column',
    template:
    `<i class="up-arrow" *ngIf="sortDirection === 'asc'" ></i>
    <i class="down-arrow" *ngIf="sortDirection === 'desc'"></i>
    <ng-content></ng-content>`
})
export class SortableColumnComponent implements OnInit, OnDestroy {
  @Input()
  columnName: string;

  @Input()
  sortDirection: string;

  private columnSortedSubscription: Subscription;
    constructor(private sortService: SortService) { }

    @HostListener('click')
    sort() {
        console.log('app-sortable-column has sort() after click');
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        console.log('app-sortable-column onInit');
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortColumn) {
                this.sortDirection = 'asc';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
