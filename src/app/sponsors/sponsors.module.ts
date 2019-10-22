
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { QuarterlyModule } from '../quarterly/quarterly.module';
import { SponsorsHomeComponent } from './sponsors-home/sponsors-home.component';
import { SponsorsNavbarComponent } from './sponsors-navbar/sponsors-navbar.component';
import { SponsorsComponent } from './sponsors.component';
import { SponsorsRoutingModule } from './sponsors.routing';

@NgModule({

  imports: [
    AppSharedModule,
    SponsorsRoutingModule,
    QuarterlyModule,
    NgbModule
  ],
  declarations: [
    SponsorsComponent,
    SponsorsNavbarComponent,
    SponsorsHomeComponent,
    //    ConsolidatedReportsComponent
  ]
})
export class SponsorsModule { }
