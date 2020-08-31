import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentMiniDTO } from 'src/app/_shared/models/studentMiniDTO';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SessionService } from '../../_shared/services/session.service';

@Component({
	selector: 'app-self-report-missing',
	templateUrl: 'self-report-missing.component.html',
	styleUrls: [ 'self-report-missing.component.css' ]
})
export class SelfReportMissingComponent implements OnInit, OnChanges {
	studentMini: StudentMiniDTO[];
	isLoading: boolean;
	smileys: Array<string>;
	public errorMessage: string;
	successMessage: string;
	submitted: string;
	studentReportStatuses: SELECTITEM[];
	years: SELECTITEM[];
	periods: SELECTITEM[];
	activeQRPeriods: SELECTITEM[];
	ssrReviewedStatuses: SELECTITEM[];
	highlightStatuses: SELECTITEM[];
	@Input() selectedYear: string;
	@Input() selectedPeriod: string;
	selectedYearPeriod: string;
	selectedSRReviewedStatus: string;
	// selectedHighlightStatus: string;
	displayOriginalFields = true;
	x: any;
	studentName: string;

	constructor(
		public router: Router,
		public session: SessionService,
		public ssrData: StudentSelfReportDataService,
		private route: ActivatedRoute
	) {
		this.years = constants.years;
		this.periods = constants.periods;
		this.activeQRPeriods = constants.activeQRperiods;

		this.selectedYear = '2020'; // '' + today.getFullYear(); //
		this.selectedPeriod = '2'; // + today.getPeriod() + 1;// '5';
		this.selectedYearPeriod = constants.selectedYearPeriod;
		this.ssrReviewedStatuses = constants.reviewedStatuses;

		this.selectedSRReviewedStatus = '0'; // this.ssrReviewedStatuses[0].value;
		// this.selectedHighlightStatus = this.highlightStatuses[0].value;

		this.smileys = constants.smileys;
	}

	ngOnInit() {
		console.log('onInit');
		this.processRouteParams();
	}

	processRouteParams() {
		console.log('SelfReportMissing setting filters form queryParams');

		// if (period > 0) {
		this.fetchFilteredData();
		// }
	}

	fetchFilteredData() {
		this.isLoading = true;
		console.log('in fetchData for StudentReportsByPeriod');
		this.ssrData.getMissingStudentSelfReportsByPeriod(this.selectedYear, this.selectedPeriod).subscribe(
			(data) => {
				this.studentMini = data;
				console.log('studentReportByPeriod has');
				console.log(this.studentMini[0]);
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				console.log('data loaded now set timeout for scroll');
				setTimeout(() => {
					this.scrollIntoView();
				}, 0);
				this.isLoading = false;
			}
		);
	}

	scrollIntoView() {
		console.log('in scrollIntoView');
		if (this.route.snapshot.queryParams['id']) {
			console.log(this.route.snapshot.queryParams['id']);
			const idSelector = '#' + this.route.snapshot.queryParams['id'];
			console.log('id param = ' + this.route.snapshot.queryParams['id']);
			const element = document.querySelector(idSelector);
			if (element) {
				console.log('querySelector returns element ' + element);
				element.scrollIntoView(true);
			}
		}
	}

	gotoStudent(guid: string, studentName: string) {
		console.log('setting studentName to ' + studentName);
		this.session.setStudentInContextName(studentName);

		const link = [ 'admins/students/student', { guid: guid } ];

		console.log('navigating to ' + link);
		this.router.navigate(link);
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.selectedYear || changes.selectedPeriod) {
			console.log(changes);
			this.fetchFilteredData();
		}
	}
}
