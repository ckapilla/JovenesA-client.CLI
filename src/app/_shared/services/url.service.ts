import { Injectable } from '@angular/core';

// // declare global {
// //   interface Window {
// //     RTCPeerConnection: any;
// //     mozRTCPeerConnection: any;
// //     webkitRTCPeerConnection: any;
// //   }
// // }
// // window.RTCPeerConnection = window.RTCPeerConnection || {};
// // window.mozRTCPeerConnection = window.mozRTCPeerConnection || {};
// // window.webkitRTCPeerConnection = window.webkitRTCPeerConnection || {};

@Injectable({ providedIn: 'root' })
export class UrlService {
  webApiPrefix: string;
  clientUrl: string;

  constructor() {

    console.log('urlService constructor has ' + window.location.hostname);
    const hostName = window.location.hostname.toLocaleLowerCase();

    if (hostName === 'privada.jovenesadelante.org') {
      this.webApiPrefix = 'https://JAWebAPI.jovenesadelante.org/api/';
      this.clientUrl = 'https://privada.jovenesadelante.org';
    } else if (hostName === 'privada-dev.jovenesadelante.org') {
      this.webApiPrefix = 'https://JAWebAPI-dev.jovenesadelante.org/api/';
      this.clientUrl = 'https://privada-dev.jovenesadelante.org';
    } else if (hostName === 'localhost') {

      // // window.RTCPeerConnection = window.RTCPeerConnection
      // //   || window.mozRTCPeerConnection
      // //   || window.webkitRTCPeerConnection; // compatibility for firefox and chrome
      // // const pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
      // // // create a bogus data channel:
      // // pc.createDataChannel('');
      // // // create offer and set local description:
      // // pc.createOffer(pc.setLocalDescription.bind(pc)); // , noop  );
      // // // listen for candidate events:
      // // pc.onicecandidate = function (ice) {
      // //   console.log('>>> onicecandidate listening...');
      // //   if (!ice || !ice.candidate || !ice.candidate.candidate) {
      // //     console.log('>>> onicecandidate, no ice');
      // //     return;
      // //   }
      // //   const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      // //   console.log('IP: ' + myIP);
      // //   pc.onicecandidate = noop;
      // // };

      //
      // check ipconfig to verify IPv4 address for current router gateway (usually Wi-Fi)
      //
      // this.webApiPrefix = 'http://192.168.1.100:1100/api/'; // Local Production
      // telmex this.webApiPrefix = 'http://192.168.1.100:1099/api/'; // Local  Development
      this.webApiPrefix = 'http://192.168.0.15:1099/api/'; // megacable Local  Development
      // this.webApiPrefix = 'https://JAWebAPI-dev.jovenesadelante.org/api/';
      // this.webApiPrefix = 'https://JAWebAPI.jovenesadelante.org/api/';  // Production
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
