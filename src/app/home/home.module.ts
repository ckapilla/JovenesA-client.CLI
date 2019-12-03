import { NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        AppSharedModule,
        HomeRoutingModule
    ],
    declarations: [HomeComponent]
})

export class HomeModule { }
