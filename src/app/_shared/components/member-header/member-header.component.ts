import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberSelectedService } from '../../services/member-selected-service';

@Component({
	selector: 'app-member-header',
	templateUrl: './member-header.component.html'
})
export class MemberHeaderComponent implements OnInit, OnDestroy {
	photoPathName: string;
	private subscription: Subscription;
	public memberGUId: string;

	constructor(public router: Router, private memberSelected: MemberSelectedService) {
		console.log('hi from member-header constructor');
	}

	ngOnInit() {
		console.log('MemberHeader ngOnInit');
		this.subscribeForMemberGUIds();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	subscribeForMemberGUIds() {
		console.log('header set up memberGUId subscription');
		this.subscription = this.memberSelected.subscribeForMemberGUIds().subscribe((message) => {
			this.memberGUId = message;
			console.log('header new MemberGUId received' + this.memberGUId);
		});
	}

	public onPhotoPathNameSet(photoPathName: string) {
		this.photoPathName = photoPathName;
		console.log('parent memberHeader has onPhotoPathNameSet called with' + photoPathName);
	}
}
