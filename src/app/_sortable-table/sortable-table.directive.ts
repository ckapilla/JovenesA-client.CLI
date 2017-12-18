import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SortService } from '../app_shared/services/sort.service';

@Directive({
  selector: '[appSortableTable]'
})

export class SortableTableDirective implements OnInit, OnDestroy {
  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;
  constructor(private sortService: SortService) {}

    ngOnInit() {
        // subscribe to sort changes so we emit and event for this data table
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }

}
