import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentDTO } from '../models/studentDTO';
import { UrlService } from '../services/url.service';
import { BaseDataService } from './base-data.service';

@Injectable({ providedIn: 'root' })
export class MentorDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  // public getMentor(mentorId: number): Observable<Member> {
  //   const url = this.WebApiPrefix + 'mentors/' + mentorId;
  //   console.log('sending AuthHttp get request for Mentor');
  //   return this.http.get(url).pipe(catchError(this.handleError));
  // }

  public getStudentsForMentorByGUId(mentorGUId: string): Observable<StudentDTO[]> {
    const url = this.WebApiPrefix + 'mentors/students_for/' + mentorGUId;
    console.log('sending AuthHttp get request for StudentsForMentor with url ' + url);
    const xx = this.http.get<StudentDTO[]>(url).pipe(catchError(this.handleError));
    console.log(xx);
    return xx;
  }

  // public updateMentor(mentor: Member): Observable<Member> {
  //   const url = this.WebApiPrefix + 'mentors/' + mentor.memberId;

  //   let body = JSON.stringify({ mentor });
  //   // strip outer 'mentor' name
  //   const x = JSON.parse(body);
  //   body = JSON.stringify(x.mentor);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   console.log('put mentor with url ' + url);
  //   return this.http.put(url, body, { headers: headers });
  // }
}
