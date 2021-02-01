import { Injectable } from '@angular/core';
import { URL_CONFIG } from './url-config';

@Injectable({ providedIn: 'root' })
export class UrlService {
  webApiPrefix: string;
  staticFilePrefix: string;
  clientUrl: string;


  constructor() {
    console.log('urlService constructor has ' + window.location.hostname);
    const hostName = window.location.hostname.toLocaleLowerCase();

    if (hostName === 'privada.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.ProdUrlPrefix + 'api/'; // 'https://JAWebAPI.jovenesadelante.org/api/';
      this.staticFilePrefix =  URL_CONFIG.ProdUrlPrefix + 'static/';
      this.clientUrl = 'https:' + hostName; // privada.jovenesadelante.org';
    } else if (hostName === 'privada-dev.jovenesadelante.org') {
      this.webApiPrefix =  URL_CONFIG.DevUrlPrefix + 'api/';
      this.staticFilePrefix =  URL_CONFIG.DevUrlPrefix + 'static/';
      this.clientUrl = 'https:' + hostName; // privada-dev.jovenesadelante.org';
    } else if (hostName === 'localhost') {
      this.webApiPrefix = URL_CONFIG.localDevUrlPrefix + 'api/'; // Local  Development
      this.staticFilePrefix = URL_CONFIG.localDevUrlPrefix + 'static/';
      // if above doesn't work, run ipconfig to see current IPv4 address
      // may want to try these at times:
      // this.webApiPrefix =  URL_CONFIG.DevUrlPrefix + 'api/'; // remote dev
      // this.webApiPrefix = URL_CONFIG.ProdUrlPrefix + 'api/'; ; // remote prod
      this.clientUrl = 'http://localhost:3000';
    }

    console.log('>>>webapi prefix: ' + this.webApiPrefix);
    console.log('>>>clientUrl: ' + this.clientUrl);
  }
  public getWebApiPrefix(): string {
    return this.webApiPrefix;
  }

  public getStaticFilePrefix(): string {
    return this.staticFilePrefix;
  }

  public getClientUrl(): string {
    return this.clientUrl;
  }

  public getClientCallbackUrl(): string {
    return this.clientUrl + '/callback';
  }
}
