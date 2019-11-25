import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class MiscDataService extends BaseDataService {
  // WebApiPrefix: string;
  private mentorsUrl = this.WebApiPrefix + 'lookup/mentors';

  mentors$: Observable<SELECTITEM[]>
    = this.http.get<SELECTITEM[]>(this.mentorsUrl).pipe(
      tap((data) => console.log('mentorNames ', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError));


  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  ////////////////////////////// lookups

  // public getMentorNames(): Observable<SELECTITEM[]> {
  //   const url = this.WebApiPrefix + 'lookup/mentors';
  //   console.log('sending AuthHttp get request ' + url);
  //   return this.http.get<SELECTITEM[]>(url).pipe(shareReplay(1), tap(x => console.log('mentorNames')), catchError(this.handleError));
  // }
  // public getMentorNamesWithGUId(): Observable<SELECTITEM[]> {
  //   const url = this.WebApiPrefix + 'lookup/mentors';
  //   console.log('sending AuthHttp get request ' + url);
  //   return this.http.get<SELECTITEM[]>(url).pipe(
  //     tap((data) => console.log('mentorNames ', JSON.stringify(data))),
  //     shareReplay(1),
  //     catchError(this.handleError));
  // }

  public getSponsorGroups(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/sponsorgroups';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(shareReplay(1), catchError(this.handleError));
  }

  public getUniversityNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/universities';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(shareReplay(1), catchError(this.handleError));
  }

  public getPrepaNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/prepas';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(shareReplay(1), catchError(this.handleError));
  }

}
