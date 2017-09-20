import { InjectionToken } from '@angular/core';

// export const WEBAPIPREFIX = new InjectionToken<string>('https://jovenesadelantewebapi.azurewebsites.net/api/v1/');

import { Injectable } from '@angular/core';

@Injectable()
export class WebApiPrefixService {
  WebApiPrefix: string;

  constructor() {
    console.log('webapiPrefix constructor');

    let backendEnv: string;
    backendEnv = 'Local'

    console.log('window: ' + window.location.hostname);
    if (window.location.hostname === 'privada.jovenesadelante.org'
              || backendEnv === 'Azure') {
      this.WebApiPrefix = 'https://jovenesadelantewebapi.azurewebsites.net/api/v1/';
    } else {
      // this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
      this.WebApiPrefix = 'http://192.168.1.69:45456/api/' ;
    }
  }
  public getWebApiPrefix() {
    return this.WebApiPrefix;
  }

}



