import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
import { Member } from '../models/member';
import { Student } from '../models/student';
import { StudentSponsorXRef } from '../models/student-sponsor-xref';
import { StudentDTO } from '../models/studentDTO';
import { StudentHeaderDTO } from '../models/studentHeaderDTO';
import { StudentMiniDTO } from '../models/studentMiniDTO';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class StudentDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  /// ///////////////////////////////////////////////
  ///  StudentsController
  /// ///////////////////////////////////////////////

  public getStudentViaGUID(studentGUId: string): Observable<Student> {
    const url = this.WebApiPrefix + 'students/' + studentGUId;
    console.log('sending AuthHttp get request for Student by GUID');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getStudentDTOViaGUID(studentGUId: string): Observable<StudentDTO> {
    const url = this.WebApiPrefix + 'students/DTO/' + studentGUId;
    console.log('sending AuthHttp get request for Students');
    return this.http.get<StudentDTO>(url);
  }

  public getStudentHeaderDTO(studentGUId: string): Observable<StudentHeaderDTO> {
    const url = this.WebApiPrefix + 'students/headerDTO/' + studentGUId;
    console.log('sending AuthHttp get request for Students');
    return this.http.get<StudentHeaderDTO>(url);
  }

  public getStudentDTOsByStatusAndYear(
    activeStatus: string,
    studentStatusId: string,
    yearJoinedJA: string,
    gradYear: string
  ): Observable<StudentDTO[]> {
    const url =
      this.WebApiPrefix + 'students' + '/' + activeStatus + '/' + studentStatusId + '/' + yearJoinedJA + '/' + gradYear;
    console.log('sending AuthHttp get request for Students with url ' + url);
    return this.http.get<StudentDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getCurrentStudentMiniDTO(guid: string): Observable<StudentMiniDTO> {
    const url = this.WebApiPrefix + 'students/name/' + guid;
    console.log('sending AuthHttp get request for StudentMini with url ' + url);
    return this.http.get<StudentMiniDTO>(url).pipe(catchError(this.handleError));
  }

  public getCurrentStudentMiniDTOs(searchStr: string): Observable<StudentMiniDTO[]> {
    const url = this.WebApiPrefix + 'students/names/' + (searchStr > '' ? searchStr : '-') + '/' + 1005;
    console.log('sending AuthHttp get request for StudentMini with url ' + url);
    return this.http.get<StudentMiniDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorsForStudent(studentId: number): Observable<Member[]> {
    const url = this.WebApiPrefix + 'students/mentors_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<Member[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupMembersForStudent(studentGUId: string): Observable<StudentSponsorXRef[]> {
    const url = this.WebApiPrefix + 'students/sponsor_group_members_for/' + studentGUId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupForStudent(studentGUId: string): Observable<StudentSponsorXRef> {
    const url = this.WebApiPrefix + 'students/sponsor_group_for/' + studentGUId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef>(url).pipe(catchError(this.handleError));
  }

  public updateStudent(student: Student): Observable<any> {
    const url = this.WebApiPrefix + 'students';
    let body = JSON.stringify({ student });
    // strip outer 'student' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.student);
    console.log('($*#)($*)#$*)#$*))*(*');
    console.log(body);

    const headers = new HttpHeaders().set('Content-Type', 'application/json'); // .set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }
}
