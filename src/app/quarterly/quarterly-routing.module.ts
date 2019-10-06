import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { OverviewComponent } from './overview/overview.component';
import { QuarterlyHomeComponent } from './quarterly-home/quarterly-home.component';
import { QuarterlyComponent } from './quarterly.component';


const routes: Routes = [
  {
    path: '', // lazy loading
    component: QuarterlyComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewComponent
      },
      {
        path: 'edits',
        component: QuarterlyHomeComponent
      },
      {
        path: 'overview',
        component: OverviewComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuarterlyRoutingModule { }
