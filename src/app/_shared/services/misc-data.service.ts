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
      tap((data) => console.log('mentorNames ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError));

  private sponsorGroupsUrl = this.WebApiPrefix + 'lookup/sponsorgroups';
  sponsorGroups$: Observable<SELECTITEM[]>
    = this.http.get<SELECTITEM[]>(this.sponsorGroupsUrl).pipe(
      tap((data) => console.log('sponsorGroups ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError));

  private universitiesUrl = this.WebApiPrefix + 'lookup/universities';
  universities$: Observable<SELECTITEM[]>
    = this.http.get<SELECTITEM[]>(this.universitiesUrl).pipe(
      tap((data) => console.log('universities ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError));

  private prepasUrl = this.WebApiPrefix + 'lookup/prepas';
  prepas$: Observable<SELECTITEM[]>
    = this.http.get<SELECTITEM[]>(this.prepasUrl).pipe(
      tap((data) => console.log('prepas ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError));

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

}