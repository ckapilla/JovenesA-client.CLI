/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from '../../../../src/app/app_shared/app_shared.module';
import * as i1 from '@angular/common';
import * as i2 from '@angular/core';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/router';
import * as i5 from '../../../../src/app/app_shared/headerbar/headerbar.component';
import * as i6 from '../../../../src/app/app_shared/components/display-errors.component';
import * as i7 from '../../../../src/app/app_shared/components/loading-container.component';
import * as i8 from '../../../../src/app/app_shared/pipes/alpha-month-pipe';
import * as i9 from '../../../../src/app/app_shared/pipes/alpha-language-pipe';
import * as i10 from '../../../../src/app/app_shared/pipes/truncate-date-pipe';
import * as i11 from './headerbar/headerbar.component.ngsummary';
import * as i12 from './components/display-errors.component.ngsummary';
import * as i13 from './components/loading-container.component.ngsummary';
import * as i14 from './pipes/alpha-month-pipe.ngsummary';
import * as i15 from './pipes/alpha-language-pipe.ngsummary';
import * as i16 from './pipes/truncate-date-pipe.ngsummary';
import * as i17 from '../../../node_modules/@angular/common/common.ngsummary';
import * as i18 from '../../../node_modules/@angular/router/router.ngsummary';
import * as i19 from '../../../node_modules/@angular/forms/forms.ngsummary';
export function AppSharedModuleNgSummary() {
    return [{ summaryKind: 2, type: { reference: i0.AppSharedModule, diDeps: [], lifecycleHooks: [] },
            entryComponents: [], providers: [{ provider: { token: { identifier: { reference: i1.NgLocalization } },
                        useClass: { reference: i1.NgLocaleLocalization, diDeps: [{ isAttribute: false, isHost: false,
                                    isSelf: false, isSkipSelf: false, isOptional: false, token: { identifier: { reference: i2.LOCALE_ID } } }],
                            lifecycleHooks: [] }, useValue: undefined, useFactory: null,
                        useExisting: undefined, deps: [{ isAttribute: false, isHost: false, isSelf: false,
                                isSkipSelf: false, isOptional: false, token: { identifier: { reference: i2.LOCALE_ID } } }],
                        multi: false }, module: { reference: i1.CommonModule, diDeps: [], lifecycleHooks: [] } },
                { provider: { token: { identifier: { reference: i3.FormBuilder, diDeps: [],
                                lifecycleHooks: [] } }, useClass: { reference: i3.FormBuilder, diDeps: [],
                            lifecycleHooks: [] }, useValue: undefined, useFactory: null,
                        useExisting: undefined, deps: [], multi: false }, module: { reference: i3.ReactiveFormsModule,
                        diDeps: [], lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.ɵi,
                                diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i3.ɵi,
                            diDeps: [], lifecycleHooks: [] }, useValue: undefined,
                        useFactory: null, useExisting: undefined, deps: [],
                        multi: false }, module: { reference: i3.ReactiveFormsModule, diDeps: [],
                        lifecycleHooks: [] } }, { provider: { token: { identifier: { reference: i3.ɵi,
                                diDeps: [], lifecycleHooks: [] } }, useClass: { reference: i3.ɵi,
                            diDeps: [], lifecycleHooks: [] }, useValue: undefined,
                        useFactory: null, useExisting: undefined, deps: [],
                        multi: false }, module: { reference: i3.FormsModule, diDeps: [], lifecycleHooks: [] } }],
            modules: [{ reference: i1.CommonModule, diDeps: [], lifecycleHooks: [] },
                { reference: i4.RouterModule, diDeps: [{ isAttribute: false, isHost: false, isSelf: false,
                            isSkipSelf: false, isOptional: true, token: { identifier: { reference: i4.ɵa } } },
                        { isAttribute: false, isHost: false, isSelf: false, isSkipSelf: false, isOptional: true,
                            token: { identifier: { reference: i4.Router } } }], lifecycleHooks: [] },
                { reference: i3.ɵbc, diDeps: [], lifecycleHooks: [] }, { reference: i3.ReactiveFormsModule,
                    diDeps: [], lifecycleHooks: [] }, { reference: i3.FormsModule,
                    diDeps: [], lifecycleHooks: [] }, { reference: i0.AppSharedModule,
                    diDeps: [], lifecycleHooks: [] }], exportedDirectives: [{ reference: i1.NgClass },
                { reference: i1.NgComponentOutlet }, { reference: i1.NgForOf }, { reference: i1.NgIf },
                { reference: i1.NgTemplateOutlet }, { reference: i1.NgStyle }, { reference: i1.NgSwitch },
                { reference: i1.NgSwitchCase }, { reference: i1.NgSwitchDefault }, { reference: i1.NgPlural },
                { reference: i1.NgPluralCase }, { reference: i3.ɵbh }, { reference: i3.NgSelectOption },
                { reference: i3.ɵq }, { reference: i3.DefaultValueAccessor }, { reference: i3.ɵbe },
                { reference: i3.ɵbg }, { reference: i3.CheckboxControlValueAccessor }, { reference: i3.SelectControlValueAccessor },
                { reference: i3.SelectMultipleControlValueAccessor }, { reference: i3.RadioControlValueAccessor },
                { reference: i3.NgControlStatus }, { reference: i3.NgControlStatusGroup }, { reference: i3.RequiredValidator },
                { reference: i3.MinValidator }, { reference: i3.MinLengthValidator }, { reference: i3.MaxValidator },
                { reference: i3.MaxLengthValidator }, { reference: i3.PatternValidator }, { reference: i3.CheckboxRequiredValidator },
                { reference: i3.EmailValidator }, { reference: i3.FormControlDirective }, { reference: i3.FormGroupDirective },
                { reference: i3.FormControlName }, { reference: i3.FormGroupName }, { reference: i3.FormArrayName },
                { reference: i3.NgModel }, { reference: i3.NgModelGroup }, { reference: i3.NgForm },
                { reference: i5.HeaderbarComponent }, { reference: i6.DisplayErrorsComponent },
                { reference: i7.LoadingContainerComponent }], exportedPipes: [{ reference: i1.AsyncPipe },
                { reference: i1.UpperCasePipe }, { reference: i1.LowerCasePipe }, { reference: i1.JsonPipe },
                { reference: i1.SlicePipe }, { reference: i1.DecimalPipe }, { reference: i1.PercentPipe },
                { reference: i1.TitleCasePipe }, { reference: i1.CurrencyPipe }, { reference: i1.DatePipe },
                { reference: i1.I18nPluralPipe }, { reference: i1.I18nSelectPipe }, { reference: i8.AlphaMonthPipe },
                { reference: i9.AlphaLanguagePipe }, { reference: i10.TruncateDatePipe }] }, i11.HeaderbarComponentNgSummary,
        i12.DisplayErrorsComponentNgSummary, i13.LoadingContainerComponentNgSummary, i14.AlphaMonthPipeNgSummary,
        i15.AlphaLanguagePipeNgSummary, i16.TruncateDatePipeNgSummary, i17.CommonModuleNgSummary,
        i18.RouterModuleNgSummary, i19.ɵbcNgSummary, i19.ReactiveFormsModuleNgSummary,
        i19.FormsModuleNgSummary];
}
//# sourceMappingURL=app_shared.module.ngsummary.js.map