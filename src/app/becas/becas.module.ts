import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../_shared/_shared.module';
import { BecasHomeComponent } from './becas-home/becas-home.component';
import { BecasNavbarComponent } from './becas-navbar/becas-navbar.component';
import { BecasRoutingModule } from './becas-routing.module';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { SelfReportMissingComponent } from './self-report-missing/self-report-missing.component';
import { SelfReportTrackingContainerComponent } from './self-report-tracking-container/self-report-tracking-container.component';
import { SelfReportTrackingComponent } from './self-report-tracking/self-report-tracking.component';
import { SelfReportUpdatesComponent } from './self-report-updates.component.ts/self-report-updates.component';

@NgModule({
  declarations: [
    BecasNavbarComponent,
    BecasComponent,
    GradesListComponent,
    GradesEditComponent,
    SelfReportTrackingComponent,
    SelfReportMissingComponent,
    SelfReportTrackingContainerComponent,
    SelfReportUpdatesComponent,
    BecasHomeComponent
  ],
  imports: [CommonModule, AppSharedModule, BecasRoutingModule, NgbModule]
})
export class BecasModule {}
