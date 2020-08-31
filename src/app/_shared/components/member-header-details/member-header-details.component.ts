import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectedMemberService } from 'src/app/_store/selectedMember/selected-member.service';
import { MemberDataService } from '../../data/member-data.service';
import { MemberHeaderDTO } from '../../models/memberHeaderDTO';
import { SessionService } from '../../services/session.service';

@Component({
	selector: 'app-member-header-details',
	templateUrl: './member-header-details.component.html'
})
export class MemberHeaderDetailsComponent implements OnInit, OnDestroy {
	data: Object;
	loadingState = 0;
	submitted: boolean;
	bReadOnly = true;

	errorMessage: string;
	successMessage: string;
	// firstNames: string;
	// lastNames: string;

	member: MemberHeaderDTO;
	photoPathName: string | undefined;
	memberGUId: string;
	@Output() onPhotoPathNameSet = new EventEmitter<string>();
	private subscription: Subscription;

	constructor(
		public currRoute: ActivatedRoute,
		private router: Router,
		private session: SessionService,
		public memberData: MemberDataService,
		public location: Location,
		private selectedMember: SelectedMemberService
	) {
		console.log('hi from MemberHeaderDetails constructor');

		this.errorMessage = '';
		this.successMessage = '';
		this.submitted = false;
	}

	ngOnInit() {
		console.log('MemberHeaderDetails ngOnInit');
		// this.fetchMemberDTOData();
		this.loadingState = 0;
		this.subscribeForMemberGUIds();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	subscribeForMemberGUIds() {
		console.log('header details set up memberGUId subscription');
		this.subscription = this.selectedMember.subscribeForMemberGUIds().subscribe((message) => {
			this.memberGUId = message;
			console.log('header details new MemberGUId received' + this.memberGUId);
			if (this.memberGUId && this.memberGUId !== '0000') {
				this.fetchData();
			}
		});
	}

	fetchData() {
		this.loadingState = 1;
		this.memberData.getMemberHeaderDTO(this.memberGUId).subscribe(
			(data) => {
				this.member = data;
			},
			(err) => {
				this.errorMessage = err;
			},
			() => {
				this.loadingState = 2;
				this.photoPathName = this.member.photoUrl;
				console.log('MemberHeaderDetails: emitting photo path: ' + this.photoPathName);
				this.onPhotoPathNameSet.emit(this.photoPathName);
			}
		);
	}

	// public ngOnChanges(changes: SimpleChanges) {
	//   if (changes.memberGUId) {
	//     console.log('memberHeaderDetails changes has memberGUId:' + this.memberGUId);
	//     this.fetchData();
	//   }
	// }
}
