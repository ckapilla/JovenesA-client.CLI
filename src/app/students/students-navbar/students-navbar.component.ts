import { Component } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'app-students-navbar',
  templateUrl: './students-navbar.component.html',
  styleUrls: ['./students-navbar.component.css']
})
export class StudentsNavbarComponent {
  currStudentGUId: string;

  constructor() {}
}
