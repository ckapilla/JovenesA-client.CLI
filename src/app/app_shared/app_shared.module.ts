import { NgModule, ModuleWithProviders } from '@angular/core';
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

@NgModule({
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

export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule
    };
  }
}
