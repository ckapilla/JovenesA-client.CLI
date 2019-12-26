import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './_shared/components/callback.component';
import { ProfileComponent } from './_shared/components/profile.component';

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
    path: 'quarterly',
    loadChildren: () => import('./quarterly/quarterly.module').then(m => m.QuarterlyModule)
  },
  {
    path: 'confidential',
    loadChildren: () => import('./confidential/confidential.module').then(m => m.ConfidentialModule)
  },

  { path: '**', redirectTo: '' }
];

// export const appRoutingProviders: any[] = [

// ];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }