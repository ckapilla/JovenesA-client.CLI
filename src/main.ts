import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

console.log('Running AOT compiled');
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

if (environment.production) {
  enableProdMode();
}
