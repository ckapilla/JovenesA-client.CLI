import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { JaCommentsComponent } from './ja-comments/ja-comments.component';
import { MrConsolidatedComponent } from './mr-consolidated/mr-consolidated.component';
import { QuarterlyHomeComponent } from './quarterly-home/quarterly-home.component';
import { QuarterlyComponent } from './quarterly.component';
import { SelfReportsComponent } from './self-reports/self-reports.component';


const routes: Routes = [
  {
    path: '', // lazy loading
    component: QuarterlyComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuarterlyHomeComponent
      },
      {
        path: 'ja-comments',
        component: JaCommentsComponent
      },
      {
        path: 'mr-consolidated',
        component: MrConsolidatedComponent
      },
      {
        path: 'self-reports',
        component: SelfReportsComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuarterlyRoutingModule { }
