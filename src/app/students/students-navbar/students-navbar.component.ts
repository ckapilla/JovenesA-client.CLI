import { Component } from '@angular/core';
import { SessionService } from '../../_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
	selector: 'app-students-navbar',
	templateUrl: './students-navbar.component.html',
	styleUrls: [ './students-navbar.component.css' ]
})
export class StudentsNavbarComponent {
	currStudentId: number;
	currStudentGUId: string;

	constructor(session: SessionService) {}
}
