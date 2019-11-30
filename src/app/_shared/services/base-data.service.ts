import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class BaseDataService {
  protected WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  //////////////////////////////////////////////////
  /// Utilities
  //////////////////////////////////////////////////

  protected handleError(error: any) {
    console.log('data service handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }
}
