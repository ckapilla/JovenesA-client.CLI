var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderbarComponent } from './headerbar/index';
import { DisplayErrorsComponent } from '../app_shared/components/display-errors.component';
import { LoadingContainerComponent } from '../app_shared/components/loading-container.component';
// import { SqlResource } from '../app_shared/services/sql-resource';
import { AlphaMonthPipe } from './pipes/alpha-month-pipe';
import { AlphaLanguagePipe } from './pipes/alpha-language-pipe';
import { TruncateDatePipe } from './pipes/truncate-date-pipe';
/**
 * Do not specify provider's for modules that might be imported by a lazy loaded module.
 */
var AppSharedModule = AppSharedModule_1 = (function () {
    function AppSharedModule() {
    }
    AppSharedModule.forRoot = function () {
        return {
            ngModule: AppSharedModule_1
        };
    };
    return AppSharedModule;
}());
AppSharedModule = AppSharedModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            RouterModule
        ],
        declarations: [
            HeaderbarComponent,
            DisplayErrorsComponent,
            LoadingContainerComponent,
            AlphaMonthPipe,
            AlphaLanguagePipe,
            TruncateDatePipe
        ],
        exports: [
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            HeaderbarComponent,
            DisplayErrorsComponent,
            LoadingContainerComponent,
            AlphaMonthPipe,
            AlphaLanguagePipe,
            TruncateDatePipe
        ]
    })
], AppSharedModule);
export { AppSharedModule };
var AppSharedModule_1;
//# sourceMappingURL=app_shared.module.js.map