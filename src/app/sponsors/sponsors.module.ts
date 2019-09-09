
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { ConsolidatedReportsComponent } from './consolidated-reports/consolidated-reports.component';
import { SponsorsHomeComponent } from './sponsors-home/sponsors-home.component';
import { SponsorsNavbarComponent } from './sponsors-navbar/sponsors-navbar.component';
import { SponsorsComponent } from './sponsors.component';
import { SponsorsRouting } from './sponsors.routing';

@NgModule({

  imports: [
    AppSharedModule,
    SponsorsRouting
  ],
  declarations: [
    SponsorsComponent,
    SponsorsNavbarComponent,
    SponsorsHomeComponent,
    ConsolidatedReportsComponent
  ]
})
export class SponsorsModule { }
