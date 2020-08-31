import { Component, Input, OnInit } from '@angular/core';
import { MemberDataService } from '../../data/member-data.service';
import { Member } from '../../models/member';
import { SessionService } from '../../services/session.service';

@Component({
	selector: 'app-mentors-for-student-list',
	templateUrl: './mentors-for-student-list.component.html'
})
export class MentorsForStudentListComponent implements OnInit {
	mentors: Array<Member>;
	errorMessage = '';
	@Input() studentId: number;

	constructor(public session: SessionService, private memberData: MemberDataService) {
		console.log('in MentorsForStudentComponent constructor with studentId=' + this.studentId);
	}

	public ngOnInit() {
		this.memberData.getMentorsForStudent(this.studentId).subscribe(
			(data) => {
				this.mentors = data;
				console.log('getMentorsForStudent');
				console.log(this.mentors[0]);
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				console.log('mentors-for-student-list loaded ' + this.mentors.length + ' rows');
			}
		);
	}
}
