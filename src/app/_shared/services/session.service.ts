import { Injectable } from '@angular/core';
import { SELECTITEM } from '../interfaces/SELECTITEM';

@Injectable({ providedIn: 'root' })
export class SessionService {
  adminStatus: number;
  mentorStatus: number;
  sponsorStatus: number;
  studentRecordGUId: string;

  userId: number;
  userGUId: string;
  inContextStudentName: string;

  inContextMemberType: SELECTITEM;

  constructor() {
    console.log('SessionService constructor');
    this.userId = 0;
  }

  public setAdminStatus(status: number): void {
    this.adminStatus = status;
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

  public setStudentRecordGUId(studentRecordGUId: string): void {
    this.studentRecordGUId = studentRecordGUId;
  }

  public getStudentRecordGUId(): string {
   // console.log("student record gui"+this.studentRecordGUId);
    return this.studentRecordGUId;
  }

  public isStudent(): boolean {
    if (!this.studentRecordGUId) {
      // console.log('Session: Is Not student -- have !studentGUId: ');
      return false;
    } else {
      // console.log('Session: have studentGUId: ' + this.studentGUId);
      return this.studentRecordGUId !== '0000';
    }
  }

  public setSponsorStatus(status: number): void {
    this.sponsorStatus = status;
  }

  public isSponsor(): boolean {
    if (!this.sponsorStatus) {
      return false;
    } else {
      return true;
    }
  }

  public setUserId(Id: number): void {
    this.userId = Id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public setUserGUId(guid: string): void {
    this.userGUId = guid;
  }

  public getUserGUId(): string {
    return this.userGUId;
  }

  // public setStudentInContextName(name: string): void {
  //   this.inContextStudentName = name;
  // }

  // public getStudentInContextName(): string {
  //   return this.inContextStudentName;
  // }

  public setMemberType(memberType: SELECTITEM): void {
    this.inContextMemberType = memberType;
  }

  public getMemberType(): SELECTITEM {
    return this.inContextMemberType;
  }
}
