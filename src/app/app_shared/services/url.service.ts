import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UrlService {
  webApiPrefix: string;
  clientUrl: string;

  constructor() {
    // console.log('UrlService constructor');

    const backendEnv:  'UbuntuDev' | 'UbuntuTest' | 'UbuntuProd' | 'local'
     = 'UbuntuProd' as  'UbuntuDev' | 'UbuntuTest' | 'UbuntuProd' | 'local';
    // console.log('window: ' + window.location.hostname);
    const hostName = window.location.hostname.toLocaleLowerCase();

    if (hostName === 'privada.jovenesadelante.org'
              || backendEnv === 'UbuntuProd') {
      this.webApiPrefix = 'https://JAWebAPI.jovenesadelante.org/api/';
    } else if (hostName === 'privada-dev.jovensadelante.org'
      || backendEnv === 'UbuntuDev') {
      this.webApiPrefix = 'https://JAWebAPI.jovenesadelante.org/api/';
      console.log(this.webApiPrefix);
    } else if (hostName === 'privada-test.jovensadelante.org'
      || backendEnv === 'UbuntuTest') {
      this.webApiPrefix = 'https://JAWebAPI.jovenesadelante.org/api/';
      console.log(this.webApiPrefix);
    } else if (backendEnv === 'local') {
      this.webApiPrefix = 'http://192.168.1.70:5000/api/' ;
    }

    if (hostName === 'privada.jovenesadelante.org') {
      this.clientUrl = 'https://privada.jovenesadelante.org';
    } else if (hostName === 'privada-dev.jovenesadelante.org') {
      this.clientUrl = 'https://privada-dev.jovenesadelante.org';
    } else if (hostName === 'privada-test.jovenesadelante.org') {
      this.clientUrl = 'https://privada-test.jovenesadelante.org';
    } else if (hostName === 'privada-prod.jovenesadelante.org') {
      this.clientUrl = 'https://privada-prod.jovenesadelante.org';
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



