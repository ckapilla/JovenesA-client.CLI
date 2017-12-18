import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SortService } from '../app_shared/services/sort.service';

@Component({
    selector: 'app-sortable-column',
    templateUrl: 'sortable-column.component.html'
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
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
