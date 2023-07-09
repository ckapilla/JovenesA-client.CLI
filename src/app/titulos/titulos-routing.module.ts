import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { TitulosListComponent } from './titulos-list/titulos-list.component';
import { TitulosComponent } from './titulos.component';

const gradesRoutes: Routes = [
  {
    path: '', // lazy loading
    component: TitulosComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TitulosListComponent
      },
      {
        path: 'titulos-list',
        component: TitulosListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(gradesRoutes)],
  exports: [RouterModule]
})
export class TitulosRoutingModule {}
