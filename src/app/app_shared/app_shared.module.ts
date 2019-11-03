import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MentorsForStudentListComponent } from '../app_shared/components/mentors-for-student-list/mentors-for-student-list.component';
import { SponsorsForStudentGridComponent } from '../app_shared/components/sponsors-for-student-grid/sponsors-for-student-grid.component';
import { AdminStudentNotesComponent } from './components/admin-student-notes/admin-student-notes.component';
import { CallbackComponent } from './components/callback.component';
import { DisplayErrorsComponent } from './components/display-errors.component';
import { FollowUpEventsComponent } from './components/follow-up-events/follow-up-events.component';
import { FollowUpRequestsListComponent } from './components/follow-up-requests-list/follow-up-requests-list.component';
import { GradeMonthsComponent } from './components/grade-months.component';
import { LoadingContainerComponent } from './components/loading-container.component';
import { MemberHeaderDetailsComponent } from './components/member-header-details/member-header-details.component';
import { MemberHeaderComponent } from './components/member-header/member-header.component';
import { MemberLookupComponent } from './components/member-lookup/member-lookup';
import { MemberSelectorComponent } from './components/member-selector/member-selector.component';
import { MentorReportsForPeriodComponent } from './components/mentor-reports-for-period/mentor-reports-for-period.component';
import { MentorReports2ListComponent } from './components/mentor-reports2-list/mentor-reports2-list.component';
import { PersonPhotoComponent } from './components/person-photo/person-photo.component';
import { PersonSharedComponent } from './components/person-shared/person-shared.component';
import { ProfileComponent } from './components/profile.component';
import { QrStatusSelectorComponent } from './components/qr-status-selector/qr-status-selector.component';
import { SortableColumnComponent } from './components/sortable-column.component';
import { SponsorGroupMemberEditComponent } from './components/sponsor-group-member-edit/sponsor-group-member-edit.component';
import { SponsorGroupMembersComponent } from './components/sponsors-for-sponsor-group/sponsor-group-members.component';
import { StudentGradesStatusComponent } from './components/student-grades-status.component';
import { StudentHeaderDetailsComponent } from './components/student-header-details/student-header-details.component';
import { StudentHeaderSponsorsComponent } from './components/student-header-sponsors/student-header-sponsors.component';
import { StudentHeaderComponent } from './components/student-header/student-header.component';
import { StudentLookupComponent } from './components/student-lookup/student-lookup';
import { StudentMRStatusComponent } from './components/student-mr-status.component';
import { StudentSelectorComponent } from './components/student-selector/student-selector.component';
import { StudentSelfReportComponent } from './components/student-self-report/student-self-report.component';
import { StudentsForMentorGridComponent } from './components/students-for-mentor-grid/students-for-mentor-grid.component';
import { StudentsForMentorListComponent } from './components/students-for-mentor-list/students-for-mentor-list.component';
import { StudentsForSponsorGridComponent } from './components/students-for-sponsor-grid/students-for-sponsor-grid.component';
import { StudentsForSponsorComponent } from './components/students-for-sponsor-list/students-for-sponsor-list';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { MarkedPipe } from './pipes/marked-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
import { UnsafeHtmlPipe } from './pipes/unsafe-html-pipe';


/**
 * Do not specify provider's for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    DisplayErrorsComponent,
    LoadingContainerComponent,
    SponsorGroupMemberEditComponent,
    StudentsForMentorGridComponent,
    StudentsForMentorListComponent,
    StudentsForSponsorGridComponent,
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
    UnsafeHtmlPipe,
    MarkedPipe,
    StudentSelfReportComponent,
    AdminStudentNotesComponent,
    MentorReportsForPeriodComponent,
    StudentLookupComponent,
    StudentHeaderComponent,
    StudentHeaderDetailsComponent,
    PersonPhotoComponent,
    QrStatusSelectorComponent,
    StudentHeaderSponsorsComponent,
    PersonSharedComponent,
    MemberLookupComponent,
    MemberHeaderComponent,
    MemberHeaderDetailsComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    StudentsForSponsorGridComponent,
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
    UnsafeHtmlPipe,
    MarkedPipe,
    StudentSelfReportComponent,
    AdminStudentNotesComponent,
    MentorReportsForPeriodComponent,
    StudentLookupComponent,
    StudentHeaderComponent,
    StudentHeaderDetailsComponent,
    QrStatusSelectorComponent,
    StudentHeaderSponsorsComponent,
    PersonSharedComponent,
    MemberLookupComponent,
    MemberHeaderComponent,
    MemberHeaderDetailsComponent
  ]
})

export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule
    };
  }
}
