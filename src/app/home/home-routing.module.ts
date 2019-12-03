import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './index';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

export const HomeRoutingModule = RouterModule.forChild(routes);
