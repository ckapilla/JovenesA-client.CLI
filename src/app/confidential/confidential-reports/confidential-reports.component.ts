import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfidentialDataService } from 'src/app/_shared/data/confidential-data.service';
import { ConfidentialReportRPT } from 'src/app/_shared/models/confidential-reportRPT';
import { SelectedStudent } from 'src/app/_store/selectedStudent/selected-student.service';
import { constants } from '../../_shared/constants/constants';
import { SessionService } from '../../_shared/services/session.service';

@Component({
	selector: 'app-confidential-reports',
	templateUrl: './confidential-reports.component.html'
})
export class ConfidentialReportsComponent implements OnInit, OnDestroy {
	isLoading: boolean;
	errorMessage: string;

	studentId: number;
	studentGUId: string;
	adminId: number;
	confidentialReportId: number;
	confidentialReports: Array<ConfidentialReportRPT>;
	smileys: Array<string>;
	studentName: string;
	haveCurrentReport: boolean;
	private subscription: Subscription;

	constructor(
		public currRoute: ActivatedRoute,
		private router: Router,
		public confidentialReportData: ConfidentialDataService,
		public session: SessionService,
		private selectedStudent: SelectedStudent
	) {
		console.log('confidentialReports constructor');
		this.smileys = constants.smileys;
	}

	ngOnInit() {
		console.log('confidentialReports ngOnInit');
		// this.mentorId = this.currRoute.snapshot.params['mentorId'];
		this.adminId = this.session.getUserId();
		console.log('mentorId ' + this.adminId);

		// // may be undefined at this point:
		// console.log('studentId ' + this.studentId);

		this.haveCurrentReport = false;

		// console.log('(((((((((((((((((MR ngOnInit)))))))))))))');
		this.subscribeForStudentGUIds();
	}

	ngOnDestroy() {
		// console.log('{{{{{{{{{{{{{MR ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
		this.subscription.unsubscribe();
	}

	subscribeForStudentGUIds() {
		// console.log('CR set up studentGUId subscription');
		this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('CR new StudentGUId received' + this.studentGUId);
			if (this.studentGUId && this.studentGUId !== '0000') {
				this.fetchData(this.studentGUId);
			}
		});
	}

	fetchData(studentGUId: string) {
		console.log('cr fetchData');
		this.isLoading = true;
		this.isLoading = true;
		this.haveCurrentReport = false;
		this.studentGUId = studentGUId;
		this.confidentialReportData.getConfidentialReportRPTsViaGUID(0, studentGUId).subscribe(
			(data) => {
				this.confidentialReports = data;
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				console.log('done: ');
				this.isLoading = false;
				for (const x of this.confidentialReports) {
					if (x.reviewedStatusId === 2086) {
						// Needs_Setup
						// console.log('current report found; disable add function');
						this.haveCurrentReport = true;
					}
				}
			}
		);
	}

	confidentialReportAdd() {
		console.log('in confidential-reports: monthlyReportAdd, ready to navigate');
		console.log(this.studentGUId);
		if (this.studentGUId !== null) {
			const link = [
				'/confidential/confidential-reports-add',
				{ adminId: this.adminId, studentGUId: this.studentGUId }
			];
			console.log('navigating to ' + JSON.stringify(link));
			this.router.navigate(link);
		}
	}

	confidentialReportEdit(confidentialReportId: number) {
		console.log('in confidential-reports: confidentialReportEdit, ready to navigate');
		if (this.studentGUId !== null) {
			const target = '/confidential/confidential-reports-edit/' + confidentialReportId;
			this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
		}
	}
}
