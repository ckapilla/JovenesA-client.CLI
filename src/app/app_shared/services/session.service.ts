import { Injectable } from '@angular/core';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { StudentDTO } from '../models/studentDTO';

@Injectable({ providedIn: 'root' })
export class SessionService {
  adminStatus: number;
  mentorStatus: number;
  sponsorStatus: number;
  studentId: number;
  studentGUId: string;
  userId: number;
  userGUId: string;
  assignedStudentId: number;
  assignedStudentGUId: string;
  assignedStudentName: string;
  currentStudent: StudentDTO;
  failedAuthorizationRoute: string;
  mostRecentMemberType: SELECTITEM;
  selectedYearJoined: string;
  selectedGradYear: string;
  inContextStudentGUId: string;

  constructor() {
    // this.loading$ = new Observable(observer => this._observer = observer)
    // .share();
    console.log('SessionService constructor');
    this.userId = 0;
    this.assignedStudentId = 0;
    this.selectedYearJoined = '2019';
    this.selectedGradYear = '0';
  }


  public setAdminStatus(status: number): void {
    this.adminStatus = status;
    // temp for testing 8/2/2019
    // no mas: this.studentId = 275; // N/A
  }

  public isAdmin(): boolean {
    if (!this.adminStatus) {
      return false;
    } else {
      return this.adminStatus === 1015;
    }
  }


  public setMentorStatus(status: number): void {
    this.mentorStatus = status;
  }

  public isMentor(): boolean {
    if (!this.mentorStatus) {
      return false;
    } else {
      return this.mentorStatus === 1015;
    }
  }



  public setStudentId(studentId: number): void {
    this.studentId = studentId;
  }

  public setStudentGUId(studentGUId: string): void {
    this.studentGUId = studentGUId;
  }

  public getStudentId(): number {
    return this.studentId ? this.studentId : 0;
  }

  public getStudentGUId(): string {
    return this.studentGUId ? this.studentGUId : '';
  }

  public isStudent(): boolean {
    if (!this.studentId) {
      console.log('Session: Is Not student -- have !studentId: ');
      return false;
    } else {
      console.log('Session: have studentId: ' + this.studentId);
      return this.studentId !== 0;
    }

  }

  public setSponsorStatus(status: number): void {
    this.sponsorStatus = status;
  }

  public isSponsor(): boolean {
    if (!this.sponsorStatus) {
      return false;
    } else {
      // return this.sponsorStatus === 1015;
      return true;
    }
  }

  public setUserId(Id: number): void {
    console.log('setUserId = ' + Id);
    this.userId = Id;
  }

  public setUserGUid(guid: string): void {
    console.log('setUserGUId = ' + guid);
    this.userGUId = guid;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getUserGUId(): string {
    return this.userGUId;
  }


  public setAssignedStudentId(Id: number): void {
    console.log('session studentId set to ' + Id);
    this.assignedStudentId = Id;
  }

  public setAssignedStudentGUId(guid: string): void {
    console.log('session studentGUId set to ' + guid);
    this.assignedStudentGUId = guid;
  }

  public setInContextStudentGUId(guid: string): void {
    console.log('session inContextStudentGUId set to ' + guid);
    this.inContextStudentGUId = guid;
  }


  public getAssignedStudentId(): number {
    console.log('session studentId getting ' + this.assignedStudentId);
    return this.assignedStudentId;
  }

  public getAssignedStudentGUId(): string {
    console.log('session studentGUId getting ' + this.assignedStudentGUId);
    return this.assignedStudentGUId;
  }

  public getInContextStudentGUId(): string {
    console.log('session InContexStudentGUId getting ' + this.inContextStudentGUId);
    return this.inContextStudentGUId;
  }

  public setStudentInContextName(name: string): void {
    this.assignedStudentName = name;
  }

  public getStudentInContextName(): string {
    return this.assignedStudentName;
  }

  public setCurrentStudent(student: StudentDTO): void {
    this.currentStudent = student;
  }

  public getCurrentStudent(): StudentDTO {
    return this.currentStudent;
  }

  // public setFailedAuthorizationRoute(route: string): void {
  //   console.log('setFailedRoute setting ' + route);
  //   this.failedAuthorizationRoute = route;
  // }

  // public getFailedAuthorizationRoute(): string {
  //   console.log('getFailedRoute returning ' + this.failedAuthorizationRoute);
  //   return this.failedAuthorizationRoute;
  // }
  public setMemberType(memberType: SELECTITEM): void {
    this.mostRecentMemberType = memberType;
  }

  public getMemberType(): SELECTITEM {
    return this.mostRecentMemberType;
  }


  public setSelectedYearJoined(yearJoined: string) {
    this.selectedYearJoined = yearJoined;
  }

  public getSelectedYearJoined(): string {
    return this.selectedYearJoined;
  }

  public setSelectedGradYear(gradYear: string) {
    this.selectedGradYear = gradYear;
  }

  public getSelectedGradYear(): string {
    return this.selectedGradYear;
  }



}
