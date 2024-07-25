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
import { InscriptionsEditComponent } from './inscriptions-edit/inscriptions-edit.component';
import { InscriptionsListComponent } from './inscriptions-list/inscriptions-list.component';

@NgModule({
  declarations: [
    BecasNavbarComponent,
    BecasComponent,
    GradesListComponent,
    GradesEditComponent,
    InscriptionsListComponent,
    InscriptionsEditComponent,
    BecasHomeComponent
  ],
  imports: [CommonModule, AppSharedModule, BecasRoutingModule, NgbModule]
})
export class BecasModule {}
