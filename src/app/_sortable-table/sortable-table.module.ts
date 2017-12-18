import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';

import { SortableTableDirective } from './sortable-table.directive';
import { SortableColumnComponent } from './sortable-column.component';


@NgModule({
    imports: [
      AppSharedModule
        ],
    declarations: [
      SortableTableDirective,
      SortableColumnComponent
      ]
})

export class SortableTableModule { }

