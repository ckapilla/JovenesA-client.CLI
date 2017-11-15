import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { platformBrowser } from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/src/app/app.component.ngfactory';
import { AppModuleNgFactory } from '../dist.aot/src/app/app.module.ngfactory';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
console.log('XXXXXXXXin AOT Main.ts with NgFactoryXXXXXXX');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
  .catch(err => console.log(err));
