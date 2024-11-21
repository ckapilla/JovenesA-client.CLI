import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CanActivateViaAdminAuthGuard,
  ConfirmDeactivateGradesEditGuard,
  ConfirmDeactivateInscriptionsEditGuard
} from '../app.routing-guards';
import { BecasPaymentListComponent } from './becas-payment-list/becas-payment-list.component';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { InscriptionsEditComponent } from './inscriptions-edit/inscriptions-edit.component';
import { InscriptionsListComponent } from './inscriptions-list/inscriptions-list.component';

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
        path: 'inscriptions-list',
        component: InscriptionsListComponent
      },
      {
        path: 'inscriptions-edit',
        component: InscriptionsEditComponent,
        canDeactivate: [ConfirmDeactivateInscriptionsEditGuard]
      },
      {
        path: 'payments-list',
        component: BecasPaymentListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class BecasRoutingModule {}
