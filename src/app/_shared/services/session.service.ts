import { Injectable } from '@angular/core';
import { SELECTITEM } from '../interfaces/SELECTITEM';

@Injectable({ providedIn: 'root' })
export class SessionService {
	adminStatus: number;
	mentorStatus: number;
	sponsorStatus: number;
	studentId: number;
	studentGUId: string;

	userId: number;
	userGUId: string;
	inContextStudentName: string;

	inContextMemberType: SELECTITEM;
	selectedYearJoined: string;
	selectedGradYear: string;
	selectedStudentStatus: string;

	constructor() {
		console.log('SessionService constructor');
		this.userId = 0;
		this.selectedStudentStatus = '1005';
		this.selectedYearJoined = '0';
		this.selectedGradYear = '0';
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
			return true;
		}
	}

	public setUserId(Id: number): void {
		this.userId = Id;
	}

	public setUserGUId(guid: string): void {
		this.userGUId = guid;
	}

	public getUserId(): number {
		return this.userId;
	}

	public getUserGUId(): string {
		return this.userGUId;
	}

	public setStudentInContextName(name: string): void {
		this.inContextStudentName = name;
	}

	public getStudentInContextName(): string {
		return this.inContextStudentName;
	}

	public setMemberType(memberType: SELECTITEM): void {
		this.inContextMemberType = memberType;
	}

	public getMemberType(): SELECTITEM {
		return this.inContextMemberType;
	}

	public setSelectedYearJoined(yearJoined: string) {
		this.selectedYearJoined = yearJoined;
	}

	public getSelectedYearJoined(): string {
		return this.selectedYearJoined;
	}

	public setSelectedStudentStatus(studentStatus: string) {
		this.selectedStudentStatus = studentStatus;
	}

	public getSelectedStudentStatus(): string {
		return this.selectedStudentStatus;
	}

	public setSelectedGradYear(gradYear: string) {
		this.selectedGradYear = gradYear;
	}

	public getSelectedGradYear(): string {
		return this.selectedGradYear;
	}
}
