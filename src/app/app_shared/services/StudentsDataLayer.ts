import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Student } from '../models/student';
import { StudentDTO } from '../models/studentDTO';


@Injectable()
export class StudentsDataLayer {
  WebApiPrefix: string;

  constructor(private http: AuthHttp,
              private _http: Http) {
    console.log('sqlResource constructor');

    const serverMode = 'Dev';

    console.log('window: ' + window.location.hostname);
    if (window.location.hostname === 'privada.jovenesadelante.org'
              // && serverMode !== 'Prod') {
              // || serverMode === 'Prod') {
              ) {
      this.WebApiPrefix = 'https://jovenesadelantewebapi.azurewebsites.net/api/v1/';
    } else {
      // this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
      this.WebApiPrefix = 'http://192.168.1.69:45456/api/' ;
    }

  }


  public getStudentsForMentor(mentorId: Number): Observable<RptStudentMentor[]> {
    const url = this.WebApiPrefix + 'studentsForMentors/' + mentorId;
    console.log('sending AuthHttp get request for StudentsForMentor');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSponsorsForStudent(studentId: number) {
    const url = this.WebApiPrefix + 'sponsorsForStudent/' + studentId;
    console.log('sending AuthHttp get request ' +  url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getStudentDTO(studentId: number): Observable<StudentDTO> {
    const url = this.WebApiPrefix  + 'studentDTO/' + studentId;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Students');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getStudentDTOs(statusId: string, gradYear: string, yearJoinedJA: string): Observable<StudentDTO[]> {
    const url = this.WebApiPrefix
    // + 'students/statusId/gradYear/yearJoinedJA'
    // + '?statusId=' + statusId
    // + '&gradYear=' + gradYear
    // + '&yearJoinedJA=' + yearJoinedJA;
    + 'students'
    + '/' + statusId
    + '/' + gradYear
    + '/' + yearJoinedJA;

// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Students with url ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


 public getStudent(studentId: Number): Observable<Student> {
    const url = this.WebApiPrefix + 'students/' + studentId;
    console.log('sending AuthHttp get request for Student');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError
      );
  }

  public updateStudent(student: Student): Observable<any> {

    const url = this.WebApiPrefix + 'students/';

    let body = JSON.stringify({ student });
    // strip outer 'student' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.student);
    // console.log('in updateStudent');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    console.log('sqlResource extractData');
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    console.log('sqlResource handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return Observable.throw(errMsg);
  }
}



