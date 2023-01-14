import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WHSE_MR } from '../models/WHSE_MR';
import { WHSE_SSRCount } from '../models/WHSE_SSRCount';
import { UrlService } from '../services/url.service';
import { BaseDataService } from './base-data.service';

@Injectable({ providedIn: 'root' })
export class WHSE_DataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  public getWHSE_SSR(): Observable<WHSE_SSRCount[]> {
    const url = this.WebApiPrefix + 'WHSE/ssr';
    console.log('sending AuthHttp get request WHSE_SSR with ' + url);
    return this.http.get<WHSE_SSRCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_MR(): Observable<WHSE_MR[]> {
    const url = this.WebApiPrefix + 'WHSE/mr';
    console.log('sending AuthHttp get request WHSE_MR with ' + url);
    return this.http.get<WHSE_MR[]>(url).pipe(catchError(this.handleError));
  }
}
