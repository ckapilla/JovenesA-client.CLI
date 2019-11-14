import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class MiscDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  ////////////////////////////// lookups

  public getMentorNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }
  public getMentorNamesByGUId(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors/guid';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroups(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/sponsorgroups';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getUniversityNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/universities';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getPrepaNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/prepas';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

}
