import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html'
})
export class StudentHeaderComponent {

  @Input() studentGUId: string;


  constructor(

  ) {
    console.log('hi from student-header constructor');

  }
  onSelectedStudentGUId($event) {
    console.log('student-header parent had new GUID event ' + $event);
    this.studentGUId = $event;
  }


}
