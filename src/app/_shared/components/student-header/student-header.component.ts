import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectedStudent } from 'src/app/_store/selectedStudent/selected-student.service';

@Component({
	selector: 'app-student-header',
	templateUrl: './student-header.component.html'
})
export class StudentHeaderComponent implements OnInit, OnDestroy {
	photoPathName: string;
	private subscription: Subscription;
	public studentGUId: string;

	constructor(public router: Router, private selectedStudent: SelectedStudent) {
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
		this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('header new StudentGUId received' + this.studentGUId);
		});
	}

	public onPhotoPathNameSet(photoPathName: string) {
		this.photoPathName = photoPathName;
		// console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
	}
}
