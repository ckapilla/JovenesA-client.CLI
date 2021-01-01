import { Injectable } from '@angular/core';
import { URL_CONFIG } from './url-config';

@Injectable({ providedIn: 'root' })
export class UrlService {
  webApiPrefix: string;
  clientUrl: string;

  constructor() {
    console.log('urlService constructor has ' + window.location.hostname);
    const hostName = window.location.hostname.toLocaleLowerCase();

    if (hostName === 'privada.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.ProdWebAPIService; // 'https://JAWebAPI.jovenesadelante.org/api/';
      this.clientUrl = 'https:' + hostName; // privada.jovenesadelante.org';
    } else if (hostName === 'privada-dev.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.DevWebAPIService; // 'https://JAWebAPI-dev.jovenesadelante.org/api/';
      this.clientUrl = 'https:' + hostName; // privada-dev.jovenesadelante.org';
    } else if (hostName === 'localhost') {
      this.webApiPrefix = URL_CONFIG.localDevWebAPIService; // Local  Development
      // if above doesn't work, run ipconfig to see current IPv4 address
      // may want to try these at times:
      // this.webApiPrefix = URL_CONFIG.DevWebAPIService; // remote dev
      // this.webApiPrefix = URL_CONFIG.ProdWebAPIService; // remote prod
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
