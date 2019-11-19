import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-student-header-mentors',
  templateUrl: './student-header-mentors.component.html'
})
export class StudentHeaderMentorsComponent {

  @Input() studentGUId: string;

  photoPathName: string;


  constructor(

  ) {
    console.log('hi from student-header-mentors constructor');

  }

  // public onSelectedStudentGUId($event) {
  //   console.log('student-header parent had new GUID event ' + $event);
  //   this.studentGUId = $event;
  // }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }

}