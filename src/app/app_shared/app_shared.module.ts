import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssignedStudentsComponent } from '../app_shared/components/assigned-students/assigned-students.component';
import { DisplayErrorsComponent } from '../app_shared/components/display-errors.component';
import { LoadingContainerComponent } from '../app_shared/components/loading-container.component';
import { MentorReportsListComponent } from '../app_shared/components/mentor-reports-list.component';
import { SortableColumnComponent } from '../app_shared/components/sortable-column.component';
import { SortableTableDirective } from '../app_shared/directives/sortable-table.directive';
import { AuthService } from '../app_shared/services/auth.service';
import { MenteeListComponent } from './components/mentee-list/mentee-list.component';
import { SponsoredStudentsComponent } from './components/sponsored-students/sponsored-students';
import { HeaderbarComponent } from './headerbar/index';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
/**
 * Do not specify provider's for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule
    ],
  declarations: [
    HeaderbarComponent,
    DisplayErrorsComponent,
    LoadingContainerComponent,
    AssignedStudentsComponent,
    MenteeListComponent,
    SponsoredStudentsComponent,
    MentorReportsListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe
  ],
  providers: [AuthService],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderbarComponent,
    DisplayErrorsComponent,
    LoadingContainerComponent,
    AssignedStudentsComponent,
    MenteeListComponent,
    SponsoredStudentsComponent,
    MentorReportsListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe
    ]
})

export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule
    };
  }
}
