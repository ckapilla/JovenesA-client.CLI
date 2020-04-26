import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { ConfidentialContainerComponent } from './confidential-container/confidential-container.component';
import { ConfidentialReportsAddComponent } from './confidential-reports-add/confidential-reports-add.component';
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
        component: ConfidentialContainerComponent
      },
      {
        path: 'confidential-reports-add',
        component: ConfidentialReportsAddComponent
      },
      {
        path: 'tracking',
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
