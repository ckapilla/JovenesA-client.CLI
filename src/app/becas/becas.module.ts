import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { BecasNavbarComponent } from './becas-navbar/becas-navbar.component';
import { BecasRoutingModule } from './becas-routing.module';
import { BecasComponent } from './becas.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { BecasHomeComponent } from './becas-home/becas-home.component';

@NgModule({
  declarations: [
    BecasNavbarComponent,
    BecasComponent,
    GradesListComponent,
    BecasHomeComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    BecasRoutingModule
  ]
})
export class BecasModule { }
