import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { QuarterlyContainerComponent } from './quarterly-container/quarterly-container.component';
import { QuarterlyHomeComponent } from './quarterly-home/quarterly-home.component';
import { QuarterlyComponent } from './quarterly.component';


const quarterlyRoutes: Routes = [
  {
    path: '', // lazy loading
    component: QuarterlyComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuarterlyContainerComponent
      },
      {
        path: 'edits',
        component: QuarterlyHomeComponent
      },
      {
        path: 'quarterly-container',
        component: QuarterlyContainerComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(quarterlyRoutes)],
  exports: [RouterModule]
})
export class QuarterlyRoutingModule { }
