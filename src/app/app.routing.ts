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
    loadChildren: './admins/admins.module#AdminsModule'
  },
  {
    path: 'mentors',
    loadChildren: './mentors/mentors.module#MentorsModule'
  },
  {
    path: 'students',
    loadChildren: './students/students.module#StudentsModule'
  },
  {
    path: 'reports',
    loadChildren: './reports/reports.module#ReportsModule'
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

