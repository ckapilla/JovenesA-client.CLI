import { RouterModule } from '@angular/router';
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'Home/Mentors',
        redirectTo: '/mentors'
    },
    { path: '**', redirectTo: '' }
];
export var appRoutingProviders = [];
export var appRouting = RouterModule.forRoot(appRoutes, { enableTracing: false });
//# sourceMappingURL=app.routing.js.map