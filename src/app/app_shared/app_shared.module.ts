import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MentorsForStudentListComponent } from '../app_shared/components/mentors-for-student-list/mentors-for-student-list.component';
import { SponsorsForStudentGridComponent } from '../app_shared/components/sponsors-for-student-grid/sponsors-for-student-grid.component';
import { CallbackComponent } from './components/callback.component';
import { DisplayErrorsComponent } from './components/display-errors.component';
import { FollowUpEventsComponent } from './components/follow-up-events/follow-up-events.component';
import { FollowUpRequestsListComponent } from './components/follow-up-requests-list/follow-up-requests-list.component';
import { GradeMonthsComponent } from './components/grade-months.component';
import { LoadingContainerComponent } from './components/loading-container.component';
import { MemberSelectorComponent } from './components/member-selector/member-selector.component';
import { MentorReports2ListComponent } from './components/mentor-reports2-list/mentor-reports2-list.component';
import { ProfileComponent } from './components/profile.component';
import { SortableColumnComponent } from './components/sortable-column.component';
import { SponsorGroupMemberEditComponent } from './components/sponsor-group-member-edit/sponsor-group-member-edit.component';
import { SponsorGroupMembersComponent } from './components/sponsors-for-sponsor-group/sponsor-group-members.component';
import { StudentGradesStatusComponent } from './components/student-grades-status.component';
import { StudentMRStatusComponent } from './components/student-mr-status.component';
import { StudentSelectorComponent } from './components/student-selector/student-selector.component';
import { StudentsForMentorGridComponent } from './components/students-for-mentor-grid/students-for-mentor-grid.component';
import { StudentsForMentorListComponent } from './components/students-for-mentor-list/students-for-mentor-list.component';
import { StudentsForSponsorComponent } from './components/students-for-sponsor-list/students-for-sponsor-list';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { HeaderbarComponent } from './headerbar/index';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
import { UnsafeHtmlPipe } from './pipes/unsafe-html-pipe';
import { AuthService } from './services/auth.service';


/**
 * Do not specify provider's for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    HeaderbarComponent,
    DisplayErrorsComponent,
    LoadingContainerComponent,
    SponsorGroupMemberEditComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorComponent,
    StudentSelectorComponent,
    FollowUpEventsComponent,
    FollowUpRequestsListComponent,
    MemberSelectorComponent,
    MentorReports2ListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    SponsorsForStudentGridComponent,
    SponsorGroupMembersComponent,
    MentorsForStudentListComponent,
    MentorsForStudentListComponent,
    StudentGradesStatusComponent,
    StudentMRStatusComponent,
    GradeMonthsComponent,
    CallbackComponent,
    ProfileComponent,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe,
    UnsafeHtmlPipe
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
    SponsorGroupMemberEditComponent,
    SponsorsForStudentGridComponent,
    SponsorGroupMembersComponent,
    MentorsForStudentListComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorComponent,
    StudentSelectorComponent,
    MemberSelectorComponent,
    MentorReports2ListComponent,
    FollowUpEventsComponent,
    FollowUpRequestsListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    GradeMonthsComponent,
    StudentGradesStatusComponent,
    StudentMRStatusComponent,
    CallbackComponent,
    ProfileComponent,
    AlphaMonthPipe,
    AlphaLanguagePipe,
    TruncateDatePipe,
    UnsafeHtmlPipe
  ]
})

export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule
    };
  }
}
