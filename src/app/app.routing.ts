import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './app_shared/components/callback.component';
import { ProfileComponent } from './app_shared/components/profile.component';

const appRoutes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'Home/Mentors',
    redirectTo: '/mentors'
  },
  {
    path: 'admins',
    loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path: 'mentors',
    loadChildren: () => import('./mentors/mentors.module').then(m => m.MentorsModule)
  },
  {
    path: 'sponsors',
    loadChildren: () => import('./sponsors/sponsors.module').then(m => m.SponsorsModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },

  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const appRouting: ModuleWithProviders =
  RouterModule.forRoot(appRoutes, {
    // onSameUrlNavigation: 'reload',
    // enableTracing: true
  });
