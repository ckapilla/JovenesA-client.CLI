import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LatestMentorReports } from '../report-models/latest-mentor-reports';
import { LatestMentorReports2 } from '../report-models/latest-mentor-reports2';
import { LatestStudentLetters } from '../report-models/latest-student-letters';
import { LatestStudentLetters2 } from '../report-models/latest-student-letters2';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class SqlReports {
  WebApiPrefix: string;

  constructor(private http: AuthHttp,
              private _http: Http) {
    console.log('window: ' + window.location.hostname);
    if (window.location.hostname === 'privada.jovenesadelante.org') {
      this.WebApiPrefix = 'http://jovenesadelantewebapi.azurewebsites.net/api/v1/';
    } else {
      this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
    }

  }

  public getLatestMentorReports(): Observable <LatestMentorReports[]>  {
    let url: string = this.WebApiPrefix + 'reports/latest-mentor-reports';
    console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
    return this.http.get(url)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  public getLatestMentorReports2(): Observable <LatestMentorReports2[]>  {
    let url: string = this.WebApiPrefix + 'reports/latest-mentor-reports2';
    console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
    return this.http.get(url)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }


  public getLatestStudentLetters(): Observable <LatestStudentLetters[]>  {
    let url: string = this.WebApiPrefix + 'reports/latest-student-letters';
    console.log('sending AuthHttp get request for LatestStudentLetters with ' + url);
    return this.http.get(url)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  public getLatestStudentLetters2(): Observable <LatestStudentLetters2[]>  {
    let url: string = this.WebApiPrefix + 'reports/latest-student-letters2';
    console.log('sending AuthHttp get request for LatestStudentLetters2 with ' + url);
    return this.http.get(url)
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  private handleError (error: any) {
    console.log('sqlResource handle error');
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return Observable.throw(errMsg);
  }

}




