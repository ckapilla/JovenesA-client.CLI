import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FollowUpDataService } from 'src/app/_shared/services/follow-up-data.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequestRPT } from '../../_shared/models/follow-up-requestRPT';
import { SessionService } from '../../_shared/services/session.service';

@Component({
	selector: 'app-follow-up-requests',
	templateUrl: 'follow-up-requests.component.html'
})
export class FollowUpRequestsComponent implements OnInit, OnDestroy {
	followUpRequests: FollowUpRequestRPT[];
	isLoading: boolean;
	smileys: Array<string>;
	followUpStatuses: SELECTITEM[];
	errorMessage: string;
	successMessage: string;
	studentId: number;
	studentGUId: string;
	mentorId: number;
	studentName: string;
	haveData = false;
	private subscription: Subscription;

	constructor(
		public followUpData: FollowUpDataService,
		public router: Router,
		public session: SessionService,
		private studentSelected: StudentSelectedService
	) {}

	ngOnInit() {
		console.log('followUpRequest ngOnInit');
		this.mentorId = this.session.getUserId();
		console.log('mentorId ' + this.mentorId);

		// console.log('(((((((((((((((((Assistance ngOnInit)))))))))))))');
		this.subscribeForStudentGUIds();
	}
	ngOnDestroy() {
		// console.log('{{{{{{{{{{{{{Assistance ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
		this.subscription.unsubscribe();
	}

	subscribeForStudentGUIds() {
		// console.log('Assistance set up studentGUId subscription');
		this.subscription = this.studentSelected
			.subscribeForStudentGUIds()
			// .pipe(takeWhile(() => this.notDestroyed))
			.subscribe((message) => {
				this.studentGUId = message;
				console.log('MR new StudentGUId received' + this.studentGUId);
				if (this.studentGUId && this.studentGUId !== '0000') {
					this.fetchData(this.studentGUId);
				}
			});
	}

	fetchData(studentGUId: string) {
		this.isLoading = true;
		this.studentGUId = studentGUId;
		console.log('in fetchData for Assistance with studentId' + this.studentGUId);
		this.followUpData.getFollowUpRequestsForStudentByGUID(this.studentGUId).subscribe(
			(data) => {
				this.followUpRequests = data;
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				console.log('done >>');
				console.log(this.followUpRequests[0]);
				console.log('<<');
				this.isLoading = false;
				this.haveData = this.followUpRequests.length > 0;
			}
		);
	}

	followUpRequestAdd() {
		console.log('in follow-up-requests: FollowUpRequestAdd, ready to navigate');
		if (this.studentGUId !== null) {
			const link = [
				'/mentors/follow-up-requests-add',
				{ mentorId: this.mentorId, studentGUId: this.studentGUId }
			];
			console.log('navigating to ' + JSON.stringify(link));
			this.router.navigate(link);
		}
	}
}
