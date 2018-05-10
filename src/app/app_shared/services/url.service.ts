import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
  webApiPrefix: string;
  clientUrl: string;

  constructor() {
    // console.log('UrlService constructor');

    const backendEnv: 'AzureProd' | 'AzureTest' | 'local' = 'AzureProd' as 'AzureProd' | 'AzureTest' | 'local';

    // console.log('window: ' + window.location.hostname);

    if (window.location.hostname.toLocaleLowerCase() === 'privada.jovenesadelante.org'
              || backendEnv === 'AzureProd') {
      this.webApiPrefix = 'http://jovenesadelantewebapi.azurewebsites.net/api/';
    } else if (window.location.hostname.toLocaleLowerCase() === 'jovenesadelantewebtest.azurewebsites.net'
              || backendEnv === 'AzureTest') {
      this.webApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/';
    } else if (backendEnv === 'local') {
      this.webApiPrefix = 'http://192.168.1.68:45456/api/' ;
    }

    if (window.location.hostname.toLocaleLowerCase() === 'privada.jovenesadelante.org') {
      this.clientUrl = 'http://privada.jovenesadelante.org';
    } else if (window.location.hostname.toLocaleLowerCase() === 'jovenesadelantewebtest.azurewebsites.net') {
      this.clientUrl = 'http://jovenesadelantewebtest.azurewebsites.net';
    } else { // localhost
      this.clientUrl = 'http://localhost:3000';
    }
    console.log('>>>webapi prefix: ' + this.webApiPrefix);
    console.log('>>>clientUrl: ' + this.clientUrl);
  }
  public getWebApiPrefix(): string {
    return this.webApiPrefix;
  }

  public getClientUrl(): string {
    return this.clientUrl;
  }

  public getClientCallbackUrl(): string {
    return this.clientUrl + '/callback';
  }

}



