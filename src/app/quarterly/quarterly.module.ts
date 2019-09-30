import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { JaCommentsComponent } from './ja-comments/ja-comments.component';
import { MrConsolidatedComponent } from './mr-consolidated/mr-consolidated.component';
import { QuarterlyHomeComponent } from './quarterly-home/quarterly-home.component';
import { QuarterlyNavbarComponent } from './quarterly-navbar/quarterly-navbar.component';
import { QuarterlyRoutingModule } from './quarterly-routing.module';
import { QuarterlyComponent } from './quarterly.component';
import { SelfReportsComponent } from './self-reports/self-reports.component';
import { SponsorViewComponent } from './sponsor-view/sponsor-view/sponsor-view.component';

@NgModule({
  declarations: [
    QuarterlyComponent,
    QuarterlyHomeComponent,
    QuarterlyNavbarComponent,
    JaCommentsComponent,
    MrConsolidatedComponent,
    SponsorViewComponent,
    SelfReportsComponent

  ],
  imports: [
    CommonModule,
    AppSharedModule,
    QuarterlyRoutingModule,
    NgbModule
  ],
})
export class QuarterlyModule { }
