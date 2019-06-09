import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
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

