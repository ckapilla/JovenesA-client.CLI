import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
// import { ConfidentialReportsListComponent } from '../app_shared/components/confidential-reports-list/confidential-reports-list.component';
import { ConfidentialHomeComponent } from './confidential-home/confidential-home.component';
import { ConfidentialNavbarComponent } from './confidential-navbar/confidential-navbar.component';
import { ConfidentialReportsAddComponent } from './confidential-reports-add/confidential-reports-add.component';
import { ConfidentialReportsTrackingComponent } from './confidential-reports-tracking/confidential-reports-tracking.component';
import { ConfidentialReportsComponent } from './confidential-reports/confidential-reports.component';
import { ConfidentialRoutingModule } from './confidential-routing.module';
import { ConfidentialComponent } from './confidential.component';
// import { OverviewComponent } from './overview/overview.component';
import { StudentHeaderConfidentialComponent } from './student-header-confidential/student-header-confidential.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ConfidentialRoutingModule,
    NgbModule
  ],
  declarations: [
    ConfidentialComponent,
    // OverviewComponent,
    ConfidentialNavbarComponent,
    ConfidentialHomeComponent,
    ConfidentialReportsComponent,
    ConfidentialReportsTrackingComponent,
    ConfidentialReportsAddComponent,
    StudentHeaderConfidentialComponent,
    // ConfidentialReportsListComponent
  ]
})
export class ConfidentialModule { }
