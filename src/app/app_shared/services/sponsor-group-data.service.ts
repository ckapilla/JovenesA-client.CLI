import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SponsorGroup } from '../models/sponsor-group';
import { SponsorGroupMember } from '../models/sponsor-group-member';
import { SponsorGroupMemberDTO } from '../models/sponsor-group-memberDTO';
import { StudentSponsorXRef } from '../models/student-sponsor-xref';
import { UrlService } from './url.service';




@Injectable({ providedIn: 'root' })
export class SponsorGroupDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    // console.log('sqlResource constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }


  // public getStudentsForSponsor(sponsorId: Number): Observable<StudentSponsorXRef[]> {
  //   const url = this.WebApiPrefix + 'students/for_sponsor/' + sponsorId;
  //   console.log('sending AuthHttp get request ' + url);
  //   return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
  // }
  // public getStudentsForSponsorByGUId(sponsorGUId: string): Observable<StudentSponsorXRef[]> {
  //   const url = this.WebApiPrefix + 'students/for_sponsor/' + sponsorGUId;
  //   console.log('sending AuthHttp get request ' + url);
  //   return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
  // }


  // list of sponsors for assigned SponsorGroup on student page
  public getMembersForSponsorGroup(sponsorGroupId: Number): Observable<SponsorGroupMemberDTO[]> {
    const url = this.WebApiPrefix + 'sponsor_groups/members/' + sponsorGroupId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroupMemberDTO[]>(url).pipe(catchError(this.handleError));
  }
  public getSponsorGroupsWithMembers(): Observable<SponsorGroupMemberDTO[]> {
    const url = this.WebApiPrefix + 'sponsor_groups/members/0';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroupMemberDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroup(id: number): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/' + id;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroup>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupMembersForStudent(studentId: number): Observable<StudentSponsorXRef[]> {
    const url = this.WebApiPrefix + 'students/sponsor_group_members_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupForStudent(studentId: number): Observable<StudentSponsorXRef> {
    const url = this.WebApiPrefix + 'students/sponsor_group_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef>(url).pipe(catchError(this.handleError));
  }


  public getSponsorGroupsForStudent(sponsorGroupId: number): Observable<SponsorGroup[]> {
    const url = this.WebApiPrefix + '/sponsor_groups_with_members/' + sponsorGroupId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroup[]>(url).pipe(catchError(this.handleError));
  }

  public addNewSponsorGroup(sponsorGroup: SponsorGroup): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/';
    let body = JSON.stringify({ sponsorGroup });
    // strip outer 'sponsorGroup'
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorGroup);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post new sponsorGroup ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }


  public updateSponsorGroup(sponsorGroup: SponsorGroup): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/';
    let body = JSON.stringify({ sponsorGroup });
    // strip outer 'sponsorGroup'
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorGroup);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to put updated sponsorGroup ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });

  }

  public deleteSponsorGroupMember(sponsorGroupId: number, sponsorGroupMemberId: number): Observable<SponsorGroupMember> {
    const url = this.WebApiPrefix + 'sponsor_groups/members/' + sponsorGroupId + '/' + sponsorGroupMemberId;
    console.log('ready to delete sponsorGroupMember ' + url); // + ' body: ' + body + ' options ' + headers);
    return this.http.delete(url);
  }
  //////////////////////////////////////////////////
  /// Utilities
  //////////////////////////////////////////////////


  private handleError(error: any) {
    console.log('sqlResource handle error');
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
