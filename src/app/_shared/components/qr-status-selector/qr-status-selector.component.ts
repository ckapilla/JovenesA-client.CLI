import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuarterlyReportRPT } from 'src/app/_shared/models/quarterly-reportRPT';
import { QuarterlyDataService } from 'src/app/_shared/services/quarterly-data.service';
import { StudentSelectedService } from 'src/app/_shared/services/student-selected.service';
import { constants } from '../../constants/constants';
import { SELECTITEM } from '../../interfaces/SELECTITEM';
import { SessionService } from '../../services/session.service';

@Component({
	selector: 'app-qr-status-selector',
	templateUrl: './qr-status-selector.component.html',
	styleUrls: [ './qr-status-selector.component.css' ]
})
export class QrStatusSelectorComponent implements OnInit, OnDestroy {
	isLoading = false;
	errorMessage: string;
	successMessage: string;
	qrMini: QuarterlyReportRPT;
	readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
	studentGUId: string; // 'model' for this component
	private subscription: Subscription;

	constructor(
		public quarterlyData: QuarterlyDataService,
		public studentSelected: StudentSelectedService,
		public session: SessionService
	) {}

	ngOnInit() {
		this.qrMini = new QuarterlyReportRPT();
		// console.log('(((((((((((((((((status selector ngOnInit)))))))))))))');
		this.subscribeForStudentGUIds();
	}

	ngOnDestroy() {
		// console.log('{{{{{{{{{{{{{status selector ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
		this.subscription.unsubscribe();
	}

	subscribeForStudentGUIds() {
		// console.log('status selector set up studentGUId subscription');
		this.subscription = this.studentSelected.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('status selector new StudentGUId received' + this.studentGUId);
			if (this.studentGUId && this.studentGUId !== '0000') {
				this.fetchData();
			}
		});
	}

	fetchData() {
		console.log('fetchData');
		this.isLoading = true;
		this.quarterlyData.getQRMiniForStudentPeriod(this.studentGUId, '2019', '3').subscribe(
			(data) => {
				this.qrMini = data;
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				this.isLoading = false;
				// console.log(JSON.stringify(this.qrMinis));
				if (this.qrMini) {
					console.log('### after retreiving, grid to data ' + this.qrMini.quarterlyReportGUId);
				} else {
					console.log('no results returned');
				}
			}
		);
	}

	setStatusForQR(statusId: number) {
		console.log('selected reviewedStatusId: ' + statusId);
		console.log('current RQGUID:' + this.qrMini.quarterlyReportGUId);

		this.quarterlyData.setQRReviewedStatus(this.qrMini.quarterlyReportGUId, statusId).subscribe(
			(student) => {
				this.successMessage = 'Updated';
				window.setTimeout(() => {
					// console.log('clearing success message');
					this.successMessage = '';
				}, 500);
			},
			(error) => {
				this.errorMessage = <any>error;
				this.isLoading = false;
			}
		);
	}
}
