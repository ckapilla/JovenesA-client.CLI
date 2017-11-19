import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// choose one since HostReplacmentPaths in plugin is not working:
import { environment } from './environments/environment.prod';
// import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log('XXXXXXXXXin Main.ts Prod ModeXXXXXXXXXXXXX');
} else {
  console.log('XXXXXXXXXin Main.ts Non-Prod ModeXXXXXXXXXXXXX');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
