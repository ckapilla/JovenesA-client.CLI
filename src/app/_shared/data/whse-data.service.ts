import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WHSE_DailyMRCount } from '../models/WHSE_DailyMRCount';
import { WHSE_DailySSRCount } from '../models/WHSE_DailySSRCount';
import { WHSE_DCCount } from '../models/WHSE_DCCount';
import { WHSE_GSCount } from '../models/WHSE_GSCount';
import { WHSE_MRCount } from '../models/WHSE_MR.Count';
import { WHSE_QRCount } from '../models/WHSE_QR.Count';
import { WHSE_SGCount } from '../models/WHSE_SGCount';
import { WHSE_SSCount } from '../models/WHSE_SSCount';
import { WHSE_SSRCount } from '../models/WHSE_SSRCount';
import { WHSE_SUCount } from '../models/WHSE_SUCount';
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
  public getWHSE_MR(): Observable<WHSE_MRCount[]> {
    const url = this.WebApiPrefix + 'WHSE/mr';
    console.log('sending AuthHttp get request WHSE_MR with ' + url);
    return this.http.get<WHSE_MRCount[]>(url).pipe(catchError(this.handleError));
  }

  public getWHSE_SS(): Observable<WHSE_SSCount[]> {
    const url = this.WebApiPrefix + 'WHSE/ss';
    console.log('sending AuthHttp get request WHSE_SS with ' + url);
    return this.http.get<WHSE_SSCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_SG(): Observable<WHSE_SGCount[]> {
    const url = this.WebApiPrefix + 'WHSE/sg';
    console.log('sending AuthHttp get request WHSE_SG with ' + url);
    return this.http.get<WHSE_SGCount[]>(url).pipe(catchError(this.handleError));
  }

  public getWHSE_GS(): Observable<WHSE_GSCount[]> {
    const url = this.WebApiPrefix + 'WHSE/gs';
    console.log('sending AuthHttp get request WHSE_GS with ' + url);
    return this.http.get<WHSE_GSCount[]>(url).pipe(catchError(this.handleError));
  }

  public getWHSE_DC(): Observable<WHSE_DCCount[]> {
    const url = this.WebApiPrefix + 'WHSE/dc';
    console.log('sending AuthHttp get request WHSE_DC with ' + url);
    return this.http.get<WHSE_DCCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_SU(): Observable<WHSE_SUCount[]> {
    const url = this.WebApiPrefix + 'WHSE/su';
    console.log('sending AuthHttp get request WHSE_SU with ' + url);
    return this.http.get<WHSE_SUCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_DailyMR(): Observable<WHSE_DailyMRCount[]> {
    const url = this.WebApiPrefix + 'WHSE/daily-mr';
    console.log('sending AuthHttp get request WHSE_DailyMR with ' + url);
    return this.http.get<WHSE_DailyMRCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_DailySSR(): Observable<WHSE_DailySSRCount[]> {
    const url = this.WebApiPrefix + 'WHSE/daily-ssr';
    console.log('sending AuthHttp get request WHSE_DailySSR with ' + url);
    return this.http.get<WHSE_DailySSRCount[]>(url).pipe(catchError(this.handleError));
  }
  public getWHSE_QR(): Observable<WHSE_QRCount[]> {
    const url = this.WebApiPrefix + 'WHSE/qr';
    console.log('sending AuthHttp get request WHSE_QR with ' + url);
    return this.http.get<WHSE_QRCount[]>(url).pipe(catchError(this.handleError));
  }


}
