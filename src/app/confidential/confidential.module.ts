import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { ConfidentialHomeComponent } from './confidential-home/confidential-home.component';
import { ConfidentialNavbarComponent } from './confidential-navbar/confidential-navbar.component';
import { ConfidentialReportsComponent } from './confidential-reports/confidential-reports.component';
import { ConfidentialRoutingModule } from './confidential-routing.module';
import { ConfidentialComponent } from './confidential.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    ConfidentialComponent,
    OverviewComponent,
    ConfidentialNavbarComponent,
    ConfidentialHomeComponent,
    ConfidentialReportsComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ConfidentialRoutingModule,
    NgbModule
  ]
})
export class ConfidentialModule { }
