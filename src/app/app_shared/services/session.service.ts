import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    adminStatus: number;
    mentorStatus: number;
    sponsorStatus: number;
    studentId: number;
    userId: number;
    assignedStudentId: number;
    assignedStudentName: string;
    failedRoute: string;

    constructor() {
        // this.loading$ = new Observable(observer => this._observer = observer)
        // .share();
        console.log('SessionService constructor 4');
        this.userId = 0;
        this.assignedStudentId = 0;
    }


    public setAdminStatus( status: number): void {
      this.adminStatus = status;
    }

    public isAdmin(): boolean {
      if (this.adminStatus === undefined) {
        return false;
      } else {
        return this.adminStatus === 1015;
      }
    }


    public setMentorStatus( status: number): void {
      this.mentorStatus = status;
    }

    public isMentor(): boolean {
      if (this.mentorStatus === undefined) {
        return false;
      } else {
        return this.mentorStatus === 1015;
      }
    }



    public setStudentId( studentId: number): void {
      this.studentId = studentId;
    }

    public getStudentId(): number {
      return this.studentId ? this.studentId : 0;
    }

    public isStudent(): boolean {
      if (this.studentId === undefined) {
        return false;
      } else {
        return this.studentId !== 0 ;
      }
    }

    public setSponsorStatus( status: number): void {
      this.sponsorStatus = status;
    }

    public isSponsor(): boolean {
      if (this.sponsorStatus === undefined) {
        return false;
      } else {
        return this.sponsorStatus === 1015;
      }
    }

    public setUserId(Id: number): void {
      this.userId = Id;
    }

    public getUserId(): number {
      return this.userId;
    }

    public setAssignedStudentId(Id: number): void {
      this.assignedStudentId = Id;
    }

    public getAssignedStudentId(): number {
      return this.assignedStudentId;
    }

    public setAssignedStudentName(name: string): void {
      this.assignedStudentName = name;
    }

    public getAssignedStudentName(): string {
      return this.assignedStudentName;
    }

    public setFailedRoute(route: string): void {
      this.failedRoute = route;
    }

    public getFailedRoute(): string {
      console.log('getFailedRoute returning ' + this.failedRoute);
      return this.failedRoute;
    }

}
