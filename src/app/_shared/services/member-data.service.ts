import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Communication } from '../models/communication';
import { Member } from '../models/member';
import { MemberWithAnyRelatedStudent } from '../models/member-with-any-related-student';
import { MemberHeaderDTO } from '../models/memberHeaderDTO';
import { MemberMiniDTO } from '../models/memberMiniDTO';
import { SponsorGroupMember } from '../models/sponsor-group-member';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';





@Injectable({ providedIn: 'root' })
export class MemberDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }


  public getCurrentMemberMiniDTO(guid: string): Observable<MemberMiniDTO> {
    const url = this.WebApiPrefix + 'members/name/' + guid;
    console.log('sending AuthHttp get request for Member with url ' + url);
    return this.http.get<MemberMiniDTO>(url).pipe(catchError(this.handleError));
  }

  public getCurrentMemberMiniDTOs(searchStr: string): Observable<MemberMiniDTO[]> {
    const url = this.WebApiPrefix + 'members/names/' + searchStr;
    console.log('sending AuthHttp get request for Members with url ' + url);
    return this.http.get<MemberMiniDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getCurrentMemberMiniDTOsByRole(role: string): Observable<MemberMiniDTO[]> {
    const url = this.WebApiPrefix + 'members/names/by_role/' + role;
    console.log('sending AuthHttp get request for Members with url ' + url);
    return this.http.get<MemberMiniDTO[]>(url).pipe(catchError(this.handleError));
  }


  public getMentorsForStudent(studentId: number): Observable<Member[]> {
    const url = this.WebApiPrefix + 'students/mentors_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<Member[]>(url).pipe(catchError(this.handleError));
  }

  public getActiveSponsorMembers(): Observable<MemberMiniDTO[]> {
    const url = this.WebApiPrefix + 'members/names/by_role/Sponsor';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<MemberMiniDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getMemberHeaderDTO(memberGUId: string): Observable<MemberHeaderDTO> {
    const url = this.WebApiPrefix + 'members/headerDTO/' + memberGUId;
    // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Members');
    return this.http.get<MemberHeaderDTO>(url);
  }

  public getMember(memberId: Number): Observable<Member> {
    const url = this.WebApiPrefix + 'members/' + memberId;
    console.log('sending AuthHttp get request for Member');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getMemberByGUId(memberGUId: string): Observable<Member> {
    const url = this.WebApiPrefix + 'members/guid/' + memberGUId;
    console.log('sending AuthHttp get request for Member data');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getCommunicationsForMember(memberId: Number): Observable<Communication[]> {
    const url = this.WebApiPrefix + 'members/communications/' + memberId;
    console.log('sending AuthHttp get request for Communications For Member with url', url);
    return this.http.get<Communication[]>(url).pipe(catchError(this.handleError));
  }

  public getMemberWithAnyRelatedStudent(type: string, status: number, studentStatus: number): Observable<MemberWithAnyRelatedStudent[]> {

    const url = this.WebApiPrefix
      + 'members/student_relations/' + type + '/' + status + '/' + studentStatus;
    // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request with url ' + url);
    return this.http.get<MemberWithAnyRelatedStudent[]>(url).pipe(catchError(this.handleError));
  }

  public updateMember(member: Member): Observable<Member> {

    const url = this.WebApiPrefix + 'members';

    let body = JSON.stringify({ member });
    // strip outer 'member' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.member);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('put member with url ' + url);
    return this.http.put(url, body, { headers: headers });
  }

  public addMember(member: Member): Observable<Member> {

    const url = this.WebApiPrefix + 'members';

    let body = JSON.stringify({ member });
    // strip outer 'member' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.member);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('post new member with url ' + url);
    return this.http.post(url, body, { headers: headers });
  }

  public addNewSponsorGroupMember(groupMember: SponsorGroupMember): Observable<SponsorGroupMember> {
    const url = this.WebApiPrefix + 'sponsor_groups/members';
    console.log(groupMember);
    let body = JSON.stringify({ groupMember });
    // strip outer 'groupMember'
    const x = JSON.parse(body);
    body = JSON.stringify(x.groupMember);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post new sponsorGroupMember ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public UpdateLastLogin(userId: number): Observable<any> {
    const url = this.WebApiPrefix + 'members' + '/LastLogin/' + userId;
    console.log('sending AuthHttp put request to set LastLogin datetime');
    return this.http.put(url, null).pipe(
      map(
        (response: Response) => {
          console.log('updateLastLogin success; no json expected ');
        },
        catchError(this.handleError))
    );
  }

  public getMentor(mentorId: Number): Observable<Member> {
    const url = this.WebApiPrefix + 'mentors/' + mentorId;
    console.log('sending AuthHttp get request for Mentor');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public updateMentor(mentor: Member): Observable<Member> {

    const url = this.WebApiPrefix + 'mentors/' + mentor.memberId;

    let body = JSON.stringify({ mentor });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentor);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('put mentor with url ' + url);
    return this.http.put(url, body, { headers: headers });

  }

}
