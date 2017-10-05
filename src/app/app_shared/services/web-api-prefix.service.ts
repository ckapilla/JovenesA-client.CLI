import { InjectionToken } from '@angular/core';

// export const WEBAPIPREFIX = new InjectionToken<string>('https://jovenesadelantewebapi.azurewebsites.net/api/v1/');

import { Injectable } from '@angular/core';

@Injectable()
export class WebApiPrefixService {
  WebApiPrefix: string;

  constructor() {
    console.log('webapiPrefix constructor');

    let backendEnv: string;
    backendEnv = 'AzureProd'

    console.log('window: ' + window.location.hostname);
    if (window.location.hostname.toLocaleUpperCase() === 'privada.jovenesadelante.org'
              || backendEnv === 'AzureProd') {
      this.WebApiPrefix = 'https://jovenesadelantewebapi.azurewebsites.net/api/';
    } else if (window.location.hostname.toLocaleUpperCase() === 'jovenesadelantewebapitest.azurewebsites.net'
              || backendEnv === 'AzureTest') {
      this.WebApiPrefix = 'https://jovenesadelantewebapitest.azurewebsites.net/api/';
    } else { // localhost
      this.WebApiPrefix = 'http://192.168.1.69:45456/api/' ;
    }
    console.log('>>>webapi prefix: ' + this.WebApiPrefix);
  }
  public getWebApiPrefix() {
    return this.WebApiPrefix;
  }

}



