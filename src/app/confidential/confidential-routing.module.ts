import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { ConfidentialHomeComponent } from './confidential-home/confidential-home.component';
import { ConfidentialComponent } from './confidential.component';
import { OverviewComponent } from './overview/overview.component';


const confidentialRoutes: Routes = [
  {
    path: '', // lazy loading
    component: ConfidentialComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewComponent
      },
      {
        path: 'edits',
        component: ConfidentialHomeComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(confidentialRoutes)],
  exports: [RouterModule]
})
export class ConfidentialRoutingModule { }
