import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AboutComponent } from './about.component';
import { AboutRouting } from './about.routing';

@NgModule({
    imports: [
        AppSharedModule,
        AboutRouting
        ],
    declarations: [AboutComponent],
})

export class AboutModule { }
