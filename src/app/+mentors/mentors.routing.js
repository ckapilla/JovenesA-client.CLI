import { RouterModule } from '@angular/router';
import { MentorsHomeComponent } from './index';
import { MentorsProfileComponent } from './index';
import { MonthlyReportsComponent } from './index';
import { MonthlyReportsAddComponent } from './index';
import { MentorsComponent } from './index';
import { CanActivateViaMentorAuthGuard } from '../app.routing-guards';
var routes = [
    {
        path: 'mentors',
        component: MentorsComponent,
        canActivate: [CanActivateViaMentorAuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: MonthlyReportsComponent
            },
            {
                path: 'home',
                component: MentorsHomeComponent
            },
            {
                path: 'profile/:id',
                component: MentorsProfileComponent
            },
            {
                path: 'monthly-reports/:mentorId',
                component: MonthlyReportsComponent
            },
            {
                path: 'monthly-reports',
                component: MonthlyReportsComponent
            },
            {
                path: 'monthly-reports-add/:mentorId/:studentId',
                component: MonthlyReportsAddComponent
            }
        ]
    }
];
export var MentorsRouting = RouterModule.forChild(routes);
//# sourceMappingURL=mentors.routing.js.map