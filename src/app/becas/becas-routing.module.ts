import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateGradesEditGuard } from '../app.routing-guards';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { SelfReportTrackingContainerComponent } from './self-report-tracking-container/self-report-tracking-container.component';

const gradesRoutes: Routes = [
  {
    path: '', // lazy loading
    component: BecasComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GradesListComponent
      },
      {
        path: 'grades-list',
        component: GradesListComponent
      },
      {
        path: 'grades-edit',
        component: GradesEditComponent,
        canDeactivate: [ConfirmDeactivateGradesEditGuard]
      },
      {
        path: 'self-reports/tracking',
        component: SelfReportTrackingContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class BecasRoutingModule { }
