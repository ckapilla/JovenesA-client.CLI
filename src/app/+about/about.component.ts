
import { Component } from '@angular/core';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import {Http} from '@angular/http';
import {Auth} from '../app_shared/services/auth.service';
import 'rxjs/add/operator/map';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})

export class AboutComponent {
  API_URL: string = 'http://localhost:3001';
  message: string;
  // constructor(public auth: AuthHttp) {}
    constructor(private http: Http,
                private authHttp: AuthHttp,
                private auth: Auth) {}

  ping() {
    this.http.get(`${this.API_URL}/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message = data.text,
        error => this.message = error._body
      );
  }

  securedPing() {
    this.authHttp.get(`${this.API_URL}/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message= data.text,
        error => this.message = error._body
      );
  }
}
