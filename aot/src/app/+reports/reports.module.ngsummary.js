/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from '../../../../src/app/+reports/reports.module';
import * as i1 from '../../../../src/app/+reports/reports.component';
import * as i2 from './reports.component.ngfactory';
import * as i3 from '../../../../src/app/+reports/reports-home/reports-home.component';
import * as i4 from './reports-home/reports-home.component.ngfactory';
import * as i5 from '../../../../src/app/+reports/reports-mentor-reports/reports-mentor-reports.component';
import * as i6 from './reports-mentor-reports/reports-mentor-reports.component.ngfactory';
import * as i7 from '../../../../src/app/+reports/reports-mentor-reports2/reports-mentor-reports2.component';
import * as i8 from './reports-mentor-reports2/reports-mentor-reports2.component.ngfactory';
import * as i9 from '../../../../src/app/+reports/reports-student-letters/reports-student-letters.component';
import * as i10 from './reports-student-letters/reports-student-letters.component.ngfactory';
import * as i11 from '../../../../src/app/+reports/reports-student-letters2/reports-student-letters2.component';
import * as i12 from './reports-student-letters2/reports-student-letters2.component.ngfactory';
import * as i13 from '@angular/common';
import * as i14 from '@angular/core';
import * as i15 from '@angular/forms';
import * as i16 from '@angular/router';
import * as i17 from '../../../../src/app/app.routing-guards';
import * as i18 from '../../../../src/app/+reports/shared/services/sql-reports';
import * as i19 from 'angular2-jwt/angular2-jwt';
import * as i20 from '@angular/http';
import * as i21 from '../../../../src/app/app_shared/app_shared.module';
import * as i22 from './reports.component.ngsummary';
import * as i23 from './shared/reports-navbar/reports-navbar.component.ngsummary';
import * as i24 from './reports-home/reports-home.component.ngsummary';
import * as i25 from './reports-mentor-reports/reports-mentor-reports.component.ngsummary';
import * as i26 from './reports-mentor-reports2/reports-mentor-reports2.component.ngsummary';
import * as i27 from './reports-student-letters/reports-student-letters.component.ngsummary';
import * as i28 from './reports-student-letters2/reports-student-letters2.component.ngsummary';
import * as i29 from '../../../node_modules/@angular/common/common.ngsummary';
import * as i30 from '../../../node_modules/@angular/router/router.ngsummary';
import * as i31 from '../../../node_modules/@angular/forms/forms.ngsummary';
import * as i32 from '../app_shared/app_shared.module.ngsummary';
export function ReportsModuleNgSummary() {
    return [{ summaryKind: 2, type: { reference: i0.ReportsModule, diDeps: [], lifecycleHooks: [] },
            entryComponents: [{ componentType: i1.ReportsComponent, componentFactory: i2.ReportsComponentNgFactory },
                { componentType: i3.ReportsHomeComponent, componentFactory: i4.ReportsHomeComponentNgFactory },
                { componentType: i5.ReportsMentorReportsComponent, componentFactory: i6.ReportsMentorReportsComponentNgFactory },
                { componentType: i7.ReportsMentorReports2Component, componentFactory: i8.ReportsMentorReports2ComponentNgFactory },
                { componentType: i9.ReportsStudentLettersComponent, componentFactory: i10.ReportsStudentLettersComponentNgFactory },
                { componentType: i11.ReportsStudentLetters2Component, componentFactory: i12.ReportsStudentLetters2ComponentNgFactory }],
            providers: [{ provider: { token: { identifier: { reference: i13.NgLocalization } }, useClass: { reference: i13.NgLocaleLocalization,
                            diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false,
                                    token: { identifier: { reference: i14.LOCALE_ID } } }], lifecycleHooks: [] },
                        useValue: undefined, useFactory: null, useExisting: undefined,
                        deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false,
                                token: { identifier: { reference: i14.LOCALE_ID } } }], multi: false }, module: { reference: i13.CommonModule,
                        diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i15.FormBuilder,
                                diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i15.FormBuilder,
                            diDeps: [], lifecycleHooks: [] }, useValue: undefined,
                        useFactory: null, useExisting: undefined, deps: [],
                        multi: false }, module: { reference: i15.ReactiveFormsModule, diDeps: [],
                        lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i15.ɵi,
                                diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i15.ɵi,
                            diDeps: [], lifecycleHooks: [] }, useValue: undefined,
                        useFactory: null, useExisting: undefined, deps: [],
                        multi: false }, module: { reference: i15.ReactiveFormsModule, diDeps: [],
                        lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i15.ɵi,
                                diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i15.ɵi,
                            diDeps: [], lifecycleHooks: [] }, useValue: undefined,
                        useFactory: null, useExisting: undefined, deps: [],
                        multi: false }, module: { reference: i15.FormsModule, diDeps: [], lifecycleHooks: [] } },
                { provider: { token: { identifier: { reference: i16.ROUTES } }, useClass: null,
                        useValue: [{ path: 'reports', component: i1.ReportsComponent, canActivate: [i17.CanActivateViaAdminAuthGuard],
                                children: [{ path: '', pathMatch: 'full', component: i3.ReportsHomeComponent },
                                    { path: 'mentor-reports', component: i5.ReportsMentorReportsComponent },
                                    { path: 'mentor-reports2', component: i7.ReportsMentorReports2Component },
                                    { path: 'student-letters', component: i9.ReportsStudentLettersComponent },
                                    { path: 'student-letters2', component: i11.ReportsStudentLetters2Component }] }],
                        useFactory: null, useExisting: undefined, deps: undefined,
                        multi: true }, module: { reference: i0.ReportsModule, diDeps: [],
                        lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i18.SqlReports,
                                diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false,
                                        isOptional: false, token: { identifier: { reference: i19.AuthHttp } } }, { isAttribute: false,
                                        isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i20.Http } } }],
                                lifecycleHooks: [] } }, useClass: { reference: i18.SqlReports, diDeps: [{ isAttribute: false,
                                    isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i19.AuthHttp } } },
                                { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false,
                                    token: { identifier: { reference: i20.Http } } }], lifecycleHooks: [] },
                        useValue: undefined, useFactory: null, useExisting: undefined,
                        deps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false,
                                isOptional: false, token: { identifier: { reference: i19.AuthHttp } } }, { isAttribute: false,
                                isHost: false, isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i20.Http } } }],
                        multi: false }, module: { reference: i0.ReportsModule, diDeps: [],
                        lifecycleHooks: [] } }], modules: [{ reference: i13.CommonModule,
                    diDeps: [], lifecycleHooks: [] }, { reference: i16.RouterModule,
                    diDeps: [{ isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true,
                            token: { identifier: { reference: i16.ɵa } } }, { isAttribute: false, isHost: false,
                            isSelf: false, isSkipSelf: false, isOptional: true, token: { identifier: { reference: i16.Router } } }],
                    lifecycleHooks: [] }, { reference: i15.ɵbc, diDeps: [], lifecycleHooks: [] },
                { reference: i15.ReactiveFormsModule, diDeps: [], lifecycleHooks: [] },
                { reference: i15.FormsModule, diDeps: [], lifecycleHooks: [] },
                { reference: i21.AppSharedModule, diDeps: [], lifecycleHooks: [] },
                { reference: i0.ReportsModule, diDeps: [], lifecycleHooks: [] }],
            exportedDirectives: [], exportedPipes: [] }, i22.ReportsComponentNgSummary,
        i23.ReportsNavbarComponentNgSummary, i24.ReportsHomeComponentNgSummary, i25.ReportsMentorReportsComponentNgSummary,
        i26.ReportsMentorReports2ComponentNgSummary, i27.ReportsStudentLettersComponentNgSummary,
        i28.ReportsStudentLetters2ComponentNgSummary, i29.CommonModuleNgSummary, i30.RouterModuleNgSummary,
        i31.ɵbcNgSummary, i31.ReactiveFormsModuleNgSummary, i31.FormsModuleNgSummary, i32.AppSharedModuleNgSummary,
        { summaryKind: 3, type: { reference: i18.SqlReports, diDeps: [{ isAttribute: false, isHost: false,
                        isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i19.AuthHttp } } },
                    { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: false,
                        token: { identifier: { reference: i20.Http } } }], lifecycleHooks: [] } }];
}
//# sourceMappingURL=reports.module.ngsummary.js.map