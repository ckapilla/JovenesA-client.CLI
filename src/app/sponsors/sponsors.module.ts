
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { QuarterlyModule } from '../quarterly/quarterly.module';
import { SponsorsContainerComponent } from './sponsors-container/sponsors-container.component';
import { SponsorsNavbarComponent } from './sponsors-navbar/sponsors-navbar.component';
import { SponsorsComponent } from './sponsors.component';
import { SponsorsRoutingModule } from './sponsors.routing';
import { StudentHeaderSponsorsComponent } from './student-header-sponsors/student-header-sponsors.component';

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
    SponsorsContainerComponent,
    StudentHeaderSponsorsComponent
    //    ConsolidatedReportsComponent
  ]
})
export class SponsorsModule { }
