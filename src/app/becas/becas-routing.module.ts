import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateGradesEditGuard } from '../app.routing-guards';
import { BecasHomeComponent } from './becas-home/becas-home.component';
import { BecasComponent } from './becas.component';
import { GradesEditComponent } from './grades-edit/grades-edit.component';
import { GradesListComponent } from './grades-list/grades-list.component';


const gradesRoutes: Routes = [
  {
    path: '', // lazy loading
    component: BecasComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BecasHomeComponent// AdminsHomeComponent
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class BecasRoutingModule { }
