import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
import { SELECTITEM } from '../interfaces/SELECTITEM';

@Injectable({ providedIn: 'root' })
export class MiscDataService extends BaseDataService {
  private mentorsUrl = this.WebApiPrefix + 'lookup/mentors';
  getMentors$(): Observable<SELECTITEM[]> {
    return this.http.get<SELECTITEM[]>(this.mentorsUrl).pipe(
      tap((data) => console.log('mentorNames ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  private adminsUrl = this.WebApiPrefix + 'lookup/admins';
  getAdmins$(): Observable<SELECTITEM[]> {
    return this.http.get<SELECTITEM[]>(this.adminsUrl).pipe(
      tap((data) => console.log('adminNames ', JSON.stringify(data[0]))),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  private sponsorGroupsUrl = this.WebApiPrefix + 'lookup/sponsorgroups';
  sponsorGroups$: Observable<SELECTITEM[]> = this.http.get<SELECTITEM[]>(this.sponsorGroupsUrl).pipe(
    tap((data) => console.log('sponsorGroups ', JSON.stringify(data[0]))),
    shareReplay(1),
    catchError(this.handleError)
  );

  private universitiesUrl = this.WebApiPrefix + 'lookup/universities';
  universities$: Observable<SELECTITEM[]> = this.http.get<SELECTITEM[]>(this.universitiesUrl).pipe(
    tap((data) => console.log('universities ', JSON.stringify(data[0]))),
    shareReplay(1),
    catchError(this.handleError)
  );

  private universityGradeMonthsUrl = this.WebApiPrefix + 'lookup/universities/grade-months';
  universityGradeMonths$: Observable<SELECTITEM[]> = this.http.get<SELECTITEM[]>(this.universityGradeMonthsUrl).pipe(
    tap((data) => console.log('universitiy Grade Months ', JSON.stringify(data[0]))),
    shareReplay(1),
    catchError(this.handleError)
  );

  private prepasUrl = this.WebApiPrefix + 'lookup/prepas';
  prepas$: Observable<SELECTITEM[]> = this.http.get<SELECTITEM[]>(this.prepasUrl).pipe(
    tap((data) => console.log('prepas ', JSON.stringify(data[0]))),
    shareReplay(1),
    catchError(this.handleError)
  );
}
