import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorReport2DataService } from 'src/app/_shared/data/mentor-report2-data.service';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';
@Component({
	templateUrl: './admins-student-mrs.component.html'
})
export class AdminsStudentMRsComponent implements OnInit {
	isLoading: boolean;
	errorMessage: string;

	studentId: number;
	studentGUId: string;
	mentorId: number;
	mentorGUId: string;
	mentorReportId: number;
	mentorReports2: Array<MentorReport2RPT>;
	studentName: string;

	constructor(
		public currRoute: ActivatedRoute,
		private router: Router,
		public mentorReportData: MentorReport2DataService,
		public session: SessionService,
		public location: Location
	) {}

	ngOnInit() {
		console.log('admins MRs ngOnInit');
		//  not here this.mentorId = this.currRoute.snapshot.params['mentorId'];
		this.mentorId = this.currRoute.snapshot.params['mentorId'];
		console.log('mentorId ' + this.mentorId);
		this.mentorGUId = this.currRoute.snapshot.params['mentorGUId'];
		this.studentGUId = this.currRoute.snapshot.params['studentGUId'];
		this.studentName = this.currRoute.snapshot.params['studentName'];
		if (this.studentName === '') {
			this.studentName = this.session.getStudentInContextName();
		}
		console.log('studentGUId  ' + this.studentGUId);
		this.isLoading = true;
		this.mentorReportData.getMentorReport2RPTsViaGUID(this.mentorGUId, this.studentGUId).subscribe(
			(data) => {
				this.mentorReports2 = data;
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				console.log('done: ');
				this.isLoading = false;
			}
		);
	}
	createProxyReport() {
		console.log('#######studentDTO: mentorGUId ' + this.mentorGUId);
		console.log('#######studentDTO: mentorId ' + this.mentorId);
		const link = [
			'/mentors/monthly-reports-add',
			{ mentorId: this.mentorId, mentorGUId: this.mentorGUId, studentGUId: this.studentGUId }
		];
		console.log('navigating to ' + JSON.stringify(link));
		this.router.navigate(link);
	}
}
