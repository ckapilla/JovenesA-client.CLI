import { RouterModule } from '@angular/router';
import { StudentsHomeComponent } from './index';
import { StudentsComponent } from './index';
import { StudentsProfileComponent } from './index';
import { StudentsSponsorLettersComponent } from './index';
import { SponsorLettersAddComponent } from './index';
import { CanActivateViaStudentAuthGuard } from '../app.routing-guards';
var routes = [
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [CanActivateViaStudentAuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: StudentsHomeComponent
            },
            {
                path: 'home',
                component: StudentsHomeComponent
            },
            {
                path: 'profile/:id',
                component: StudentsProfileComponent
            },
            {
                path: 'sponsor-letters/:id',
                component: StudentsSponsorLettersComponent
            },
            {
                path: 'sponsor-letters-add/:studentId/:sponsorId',
                component: SponsorLettersAddComponent
            }
        ]
    }
];
export var StudentsRouting = RouterModule.forChild(routes);
//# sourceMappingURL=students.routing.js.map