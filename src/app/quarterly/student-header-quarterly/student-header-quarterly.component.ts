import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentSelectedService } from '../../_shared/services/student-selected.service';

@Component({
	selector: 'app-student-header-quarterly',
	templateUrl: './student-header-quarterly.component.html'
})
export class StudentHeaderQuarterlyComponent implements OnInit, OnDestroy {
	@Output() onStudentGUIdSet = new EventEmitter<boolean>();
	photoPathName: string;
	private subscription: Subscription;
	public studentGUId: string;

	constructor(public router: Router, private studentSelected: StudentSelectedService) {
		console.log('hi from student-header constructor');
	}

	ngOnInit() {
		this.subscribeForStudentGUIds();
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	subscribeForStudentGUIds() {
		// console.log('header set up studentGUId subscription');
		this.subscription = this.studentSelected.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('header new StudentGUId received' + this.studentGUId);
			// console.log(this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000');
			this.onStudentGUIdSet.emit(
				this.studentGUId && this.studentGUId !== undefined && this.studentGUId !== '0000'
			);
		});
	}

	public onPhotoPathNameSet(photoPathName: string) {
		this.photoPathName = photoPathName;
		// console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
	}
}
