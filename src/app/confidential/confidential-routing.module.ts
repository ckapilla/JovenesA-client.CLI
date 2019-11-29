import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { ConfidentialQuarterlyComponent } from './confidential-container/confidential-quarterly.component';
import { ConfidentialReportsTrackingComponent } from './confidential-reports-tracking/confidential-reports-tracking.component';
import { ConfidentialComponent } from './confidential.component';


const confidentialRoutes: Routes = [
  {
    path: '', // lazy loading
    component: ConfidentialComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ConfidentialQuarterlyComponent
      },
      {
        path: 'edits',
        component: ConfidentialQuarterlyComponent
      },
      {
        path: 'quarterly-container',
        component: ConfidentialReportsTrackingComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(confidentialRoutes)],
  exports: [RouterModule]
})
export class ConfidentialRoutingModule { }
