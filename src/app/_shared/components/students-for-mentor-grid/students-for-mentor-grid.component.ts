import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectedStudent } from 'src/app/_store/selectedStudent/selected-student.service';
import { constants } from '../../constants/constants';
import { StudentDataService } from '../../data/student-data.service';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'students-for-mentor-grid',
	templateUrl: './students-for-mentor-grid.component.html'
})
export class StudentsForMentorGridComponent implements OnInit, OnDestroy {
	students: Array<StudentDTO>;
	emojis: Array<string> = [];
	studentId: number;
	studentGUId: string;
	errorMessage = '';
	isLoading: boolean;
	private subscription: Subscription;
	gridLoaded: boolean;

	constructor(
		public session: SessionService,
		private studentData: StudentDataService,
		private selectedStudent: SelectedStudent
	) {
		this.emojis = constants.emojis;

		console.log('in StudentsForMentorGridComponent constructor');
	}

	public ngOnInit() {
		this.isLoading = true;
		this.studentGUId = '';
		this.gridLoaded = false;
		this.subscribeForStudentGUIds();
	}
	public ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	subscribeForStudentGUIds() {
		console.log('studentGrid set up studentGUId subscription');
		this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
			this.studentGUId = message;
			console.log('students grid new StudentGUId received' + message);
			// only want to respond on initial load; don't want changes from self (user click)
			if (!this.gridLoaded) {
				// initial load no student preselcted
				this.fetchGridData();
				this.gridLoaded = true;
			}
		});
	}

	fetchGridData() {
		console.log('studentGrid calling getStudentsForMentor');
		this.studentData.getStudentsForMentorByGUId(this.session.getUserGUId()).subscribe(
			(data) => {
				this.students = data;
			},
			(err) => console.error('Subscribe error: ' + err),
			() => {
				this.isLoading = false;
				console.log('studentsForMentorGrid has # students: ' + this.students.length);
				console.log(this.students);
				if (this.students.length > 0) {
					this.selectInitialStudentAfterLoad();
				} else {
					this.errorMessage =
						'No students are assigned at this time. / No hay estudiantes asignado en este momento';
				}
			}
		);
	}

	selectInitialStudentAfterLoad() {
		if (this.studentGUId === '0000') {
			console.log('no StudentGuid set, force selection of first row');
			this.studentGUId = this.students[0].studentGUId;
		}
		// see if current student
		const idx = this.students.findIndex((x) => x.studentGUId === this.studentGUId);
		if (idx >= 0) {
			console.log('selecting specific row, studentGUId = ' + this.studentGUId);
			this.selectStudent(this.studentGUId, idx);
		} else {
			// left over student from other process, so set to zero and call again recursively
			this.studentGUId = '0000';
			this.selectInitialStudentAfterLoad();
		}
	}

	public selectStudent(studentGUId: string, idx: number) {
		console.log('student selected studentGUId: ' + studentGUId + 'idx: ' + idx);
		const studentName: string = this.students[idx].studentName;
		this.studentGUId = studentGUId;
		this.setRowClasses(this.students[idx].studentGUId, this.students[idx].activeStatus);
		this.selectedStudent.notifyNewStudentGUId(studentGUId);
	}

	// called from code (above) and from template
	public setRowClasses(studentGUId: string, activeStatus: number) {
		const classes = {
			'table-success': studentGUId === this.studentGUId,
			dimmed: activeStatus === 0,
			'student-row': true,
			clickable: true
		};

		return classes;
	}
}
