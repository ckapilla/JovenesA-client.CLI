import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { BecasComponent } from './becas.component';
import { GradesListComponent } from './grades-list/grades-list.component';
import { BecasHomeComponent } from './becas-home/becas-home.component';


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
      // {
      //   path: 'becas-home',
      //   component: AdminsHomeComponent
      // },
      {
        path: 'grades-list',
        component: GradesListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class BecasRoutingModule { }