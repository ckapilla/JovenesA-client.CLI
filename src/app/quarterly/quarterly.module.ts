import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { StudentHeaderQuarterlyComponent } from '../quarterly/student-header-quarterly/student-header-quarterly.component';
import { JaCommentsComponent } from './ja-comments/ja-comments.component';
import { MrConsolidatedComponent } from './mr-consolidated/mr-consolidated.component';
import { QuarterlyContainerComponent } from './quarterly-container/quarterly-container.component';
import { PrivateNotesComponent } from './private-notes/private-notes.component';
import { QuarterlyHomeComponent } from './quarterly-home/quarterly-home.component';
import { QuarterlyNavbarComponent } from './quarterly-navbar/quarterly-navbar.component';
import { QuarterlyRoutingModule } from './quarterly-routing.module';
import { QuarterlyComponent } from './quarterly.component';
import { SelfReportsComponent } from './self-reports/self-reports.component';

@NgModule({
  declarations: [
    QuarterlyComponent,
    QuarterlyHomeComponent,
    QuarterlyNavbarComponent,
    JaCommentsComponent,
    MrConsolidatedComponent,
    SelfReportsComponent,
    QuarterlyContainerComponent,
    PrivateNotesComponent,
    StudentHeaderQuarterlyComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    QuarterlyRoutingModule,
    NgbModule
  ],
  exports: [
    JaCommentsComponent,
    MrConsolidatedComponent,
    SelfReportsComponent
  ]
})
export class QuarterlyModule { }
