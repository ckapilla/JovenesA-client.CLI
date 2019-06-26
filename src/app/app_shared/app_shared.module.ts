import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisplayErrorsComponent } from './components/display-errors.component';
import { FollowUpEventsComponent } from './components/follow-up-events/follow-up-events.component';
import { FollowUpRequestsListComponent } from './components/follow-up-requests-list/follow-up-requests-list.component';
import { LoadingContainerComponent } from './components/loading-container.component';
import { MemberSelectorComponent } from './components/member-selector/member-selector.component';
import { MentorReportsListComponent } from './components/mentor-reports-list/mentor-reports-list.component';
import { MentorReports2ListComponent } from './components/mentor-reports2-list/mentor-reports2-list.component';
import { SortableColumnComponent } from './components/sortable-column.component';
import { StudentSelectorComponent } from './components/student-selector/student-selector.component';
import { StudentsForMentorGridComponent } from './components/students-for-mentor-grid/students-for-mentor-grid.component';
import { StudentsForMentorListComponent } from './components/students-for-mentor-list/students-for-mentor-list.component';
import { StudentsForSponsorComponent } from './components/students-for-sponsor-list/students-for-sponsor-list';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { HeaderbarComponent } from './headerbar/index';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
import { AuthService } from './services/auth.service';


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
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorComponent,
    StudentSelectorComponent,
    FollowUpEventsComponent,
    FollowUpRequestsListComponent,
    MemberSelectorComponent,
    MentorReportsListComponent,
    MentorReports2ListComponent,
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
    MemberSelectorComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorComponent,
    StudentSelectorComponent,
    MemberSelectorComponent,
    MentorReportsListComponent,
    MentorReports2ListComponent,
    FollowUpEventsComponent,
    FollowUpRequestsListComponent,
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
