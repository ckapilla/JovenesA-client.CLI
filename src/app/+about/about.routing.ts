import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './index';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  }
];
export const AboutRouting = RouterModule.forChild(routes);
