import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html'
})
export class StudentHeaderComponent {

  @Input() studentGUId: string;

  photoPathName: string;


  constructor(
    public router: Router,
  ) {
    console.log('hi from student-header constructor');

  }

  // public onSelectedStudentGUId($event) {
  //   console.log('student-header parent had new GUID event ' + $event);
  //   this.studentGUId = $event;
  // }

  public onPhotoPathNameSet(photoPathName: string) {
    this.photoPathName = photoPathName;
    // console.log('parent studentHeader has onPhotoPathNameSet called with' + photoPathName);
  }

  // gotoStudentList() {
  //   const link = 'admins/students/studentList';
  //   this.router.navigateByUrl(link);
  // }

  // gotoStudent() {
  //   const link = 'admins/students/student';
  //   this.router.navigateByUrl(link);
  // }


}
